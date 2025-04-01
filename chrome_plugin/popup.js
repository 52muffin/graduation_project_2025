document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("analyze").addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: insertInfoBox
            });
        });
    });

    document.getElementById("stop").addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: removeInfoBox
            });
        });
    });
});

// 🟡 노란색 정보창 삽입 함수
function insertInfoBox() {
    if (document.getElementById("news-trust-info")) return; // 중복 방지

    const infoBox = document.createElement("div");
    infoBox.id = "news-trust-info";
    infoBox.style.position = "fixed";
    infoBox.style.top = "0";
    infoBox.style.left = "0";
    infoBox.style.width = "100%";
    infoBox.style.background = "#fff4c2";
    infoBox.style.padding = "20px";
    infoBox.style.borderBottom = "2px solid #ccc";
    infoBox.style.display = "flex";
    infoBox.style.justifyContent = "flex-start";
    infoBox.style.alignItems = "center";
    infoBox.style.fontSize = "16px";
    infoBox.style.fontWeight = "bold";
    infoBox.style.zIndex = "9999";

    // 🟢 신뢰도
    const trustScore = document.createElement("span");
    trustScore.innerHTML = `신뢰도 <span style="color: green;">83%</span>`;
    trustScore.style.marginRight = "20px";

    // 🔴 편향성
    const biasScore = document.createElement("span");
    biasScore.innerHTML = `편향성 <span style="color: red;">46%</span>`;

    // 🔗 상세페이지 링크
    const detailLink = document.createElement("a");
    detailLink.href = "#";
    detailLink.innerText = "상세페이지";
    detailLink.style.color = "blue";
    detailLink.style.cursor = "pointer";
    detailLink.style.marginLeft = "auto";
    detailLink.style.marginRight = "40px";
    detailLink.addEventListener("click", () => {
        alert("상세 페이지로 이동합니다!");
    });

    // 요소 추가
    infoBox.appendChild(trustScore);
    infoBox.appendChild(biasScore);
    infoBox.appendChild(detailLink);
    document.body.prepend(infoBox);

    // 기존 콘텐츠 아래로 밀기
    document.body.style.marginTop = infoBox.offsetHeight + "px";
}

// ❌ 정보창 제거 함수
function removeInfoBox() {
    const infoBox = document.getElementById("news-trust-info");
    if (infoBox) {
        infoBox.remove();
        document.body.style.marginTop = "0"; // 원래 상태로 복구
    }
}
