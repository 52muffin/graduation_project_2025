document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("extractedData", (data) => {
        if (data.extractedData) {
            document.getElementById("title").innerText = data.extractedData.title || "제목 없음";
            document.getElementById("press").innerText = data.extractedData.press || "신문사 정보 없음";
            document.getElementById("reporter").innerText = data.extractedData.reporter || "기자 정보 없음";
            document.getElementById("date").innerText = data.extractedData.date || "작성일 없음";
            document.getElementById("updated").innerText = data.extractedData.updated || "수정일 없음";
            document.getElementById("content").innerText = data.extractedData.content || "기사 본문 없음";
        } else {
            document.body.innerHTML = "<p>저장된 기사 정보가 없습니다.</p>";
        }
    });
});
