document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["extractedData", "analysisResult"], (data) => {
      const article = data.extractedData;
      const analysis = data.analysisResult;
  
      // 왼쪽: 기사 정보 표시
      if (article) {
        document.getElementById("title").innerText = article.title || "제목 없음";
        document.getElementById("press").innerText = article.press || "신문사 정보 없음";
        document.getElementById("reporter").innerText = article.reporter || "기자 정보 없음";
        document.getElementById("date").innerText = article.date || "작성일 없음";
        document.getElementById("updated").innerText = article.updated || "수정일 없음";
        document.getElementById("content").innerText = article.content || "기사 본문 없음";
      }
  
      // 오른쪽: 분석 결과 표시
      const analysisDiv = document.getElementById("analysis");
      if (analysis && analysis.length > 0) {
        analysis.forEach(item => {
          const div = document.createElement("div");
          div.className = "analyzed-item";
          div.innerHTML = `<span class="label">[${item.label}]</span> ${item.text}`;
          analysisDiv.appendChild(div);
        });
      } else {
        analysisDiv.innerText = "분석 결과가 없습니다.";
      }
    });
  });
  