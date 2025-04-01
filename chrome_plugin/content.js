(function () {
    function insertInfoBox() {
      // 1. 기존에 생성된 박스가 있다면 중복 삽입 방지
      if (document.getElementById("news-trust-info")) return;
  
      // 2. 정보 박스 생성
      const infoBox = document.createElement("div");
      infoBox.id = "news-trust-info"; // 중복 방지 ID 추가
      infoBox.style.position = "fixed"; // 페이지 스크롤에도 고정되도록 설정
      infoBox.style.top = "0"; // 페이지의 최상단에 붙임
      infoBox.style.left = "0"; // 좌측으로 정렬
      infoBox.style.width = "100%"; // 전체 너비 차지
      infoBox.style.background = "#fff4c2"; // 연한 노란색
      infoBox.style.padding = "20px";
      infoBox.style.borderBottom = "2px solid #ccc";
      infoBox.style.display = "flex";
      infoBox.style.justifyContent = "flex-start";
      infoBox.style.alignItems = "center";
      infoBox.style.fontSize = "16px";
      infoBox.style.fontWeight = "bold";
      infoBox.style.zIndex = "9999"; // 항상 위에 표시
  
      // 3. 신뢰도 및 편향성 텍스트 추가
      const trustScore = document.createElement("span");
      trustScore.innerHTML = `신뢰도 <span style="color: green;">83%</span>`;
      trustScore.style.marginRight = "20px"; // 편향성 텍스트와 간격 추가
  
      const biasScore = document.createElement("span");
      biasScore.innerHTML = `편향성 <span style="color: red;">46%</span>`;
  
      // 4. 상세 페이지 링크 추가
      const detailLink = document.createElement("a");
      detailLink.href = "#"; // 실제 상세 페이지 URL로 변경해야 함
      detailLink.innerText = "상세페이지";
      detailLink.style.color = "blue";
      detailLink.style.cursor = "pointer";
      //detailLink.style.textDecoration = "underline";
      detailLink.style.marginLeft = "auto"; // 자동으로 왼쪽 여백을 채워 오른쪽으로 정렬
      detailLink.style.marginRight = "40px"; // 오른쪽에 40px 여백 추가
      detailLink.addEventListener("click", () => {
        alert("상세 페이지로 이동합니다!");
      });
  
      // 5. 요소 추가
      infoBox.appendChild(trustScore);
      infoBox.appendChild(biasScore);
      infoBox.appendChild(detailLink);
  
      // 6. body의 첫 번째 자식 요소로 추가
      document.body.prepend(infoBox);
  
      // 7. 기존 페이지의 내용을 아래로 밀어주기
      document.body.style.marginTop = infoBox.offsetHeight + "px";
    }
  
    // 페이지 로딩이 끝난 후 실행
    if (document.readyState === "complete") {
      insertInfoBox();
    } else {
      window.addEventListener("load", insertInfoBox);
    }
  })();
  