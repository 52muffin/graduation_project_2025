import os
import torch
import json
import re
from transformers import BertTokenizer, BertModel
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import torch.nn as nn

# ✅ 라벨 매핑
label_map = {0: "사실형", 1: "추론형", 2: "예측형"}

# ✅ 분류 모델 정의 (BERT + Linear Layer)
class BertClassifier(nn.Module):
    def __init__(self, bert_model, hidden_size=768, num_classes=3):
        super(BertClassifier, self).__init__()
        self.bert = bert_model
        self.classifier = nn.Linear(hidden_size, num_classes)

    def forward(self, input_ids, attention_mask=None, token_type_ids=None):
        outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
            return_dict=True
        )
        cls_output = outputs.last_hidden_state[:, 0, :]
        return self.classifier(cls_output)

# ✅ 모델 로드
MODEL_PATH = "C:/Users/myoso/graduation_project/LOCAL_MODEL_PATH"
VERSION_DIR = os.path.join(MODEL_PATH, "model_v2")
MODEL_FILE = os.path.join(VERSION_DIR, "trained_model_epoch_3.pt")

tokenizer = BertTokenizer.from_pretrained(MODEL_PATH)
bert_base = BertModel.from_pretrained(MODEL_PATH, add_pooling_layer=False)
model = BertClassifier(bert_base)
model.load_state_dict(torch.load(MODEL_FILE, map_location=torch.device("cpu")))
model.eval()

# ✅ 문장 분리 함수
def split_sentences(text):
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    return [s.strip() for s in sentences if s.strip()]

# ✅ 문장 분석 함수
def analyze_sentences(sentences):
    result = []
    for sentence in sentences:
        inputs = tokenizer(
            sentence,
            return_tensors='pt',
            padding='max_length',
            truncation=True,
            max_length=128
        )
        with torch.no_grad():
            logits = model(**inputs)
            pred_class = torch.argmax(logits, dim=1).item()
            result.append({
                "text": sentence,
                "label": label_map[pred_class]
            })
    return result

# ✅ Django API 뷰 (경로: /receive/)
@csrf_exempt
@require_POST
def receive_view(request):
    try:
        data = json.loads(request.body)
        content = data.get("content", "")

        print("📥 받은 기사 본문:")
        print(content)
        print("=" * 50)

        if not content:
            print("❌ 본문이 없습니다.")
            return JsonResponse({"analyzed": []}, status=200)

        sentences = split_sentences(content)
        analysis_result = analyze_sentences(sentences)

        print("🧠 분석 결과:")
        for item in analysis_result:
            print(f"  ▶ \"{item['text']}\" → {item['label']}")
        print("=" * 50)

        # ✅ 분석 결과를 JSON으로 응답
        return JsonResponse({"analyzed": analysis_result}, json_dumps_params={"ensure_ascii": False}, status=200)

    except Exception as e:
        print("❌ 예외 발생:", e)
        return JsonResponse({"error": str(e)}, status=500)
