document.getElementById("extract").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "extract_article" });
    });
});

document.getElementById("details").addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("details.html") });
});

document.getElementById("analyze").addEventListener("click", () => {
    chrome.storage.local.get("extractedData", (result) => {
        if (result.extractedData) {
            fetch("http://127.0.0.1:8000/receive/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(result.extractedData)
            })
            .then(res => res.json())
            .then(data => {
                alert("서버 응답: " + JSON.stringify(data));
            })
            .catch(err => {
                alert("전송 중 에러 발생: " + err);
            });
        } else {
            alert("먼저 기사를 추출하세요!");
        }
    });    
});

document.getElementById("close").addEventListener("click", () => {
    window.close();
});
