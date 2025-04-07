chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract_article") {
        let extractedData = {
            press: "",    // 신문사
            title: "",    // 기사 제목
            reporter: "", // 기자명
            date: "",     // 작성일
            updated: "",  // 수정일
            content: ""   // 기사 본문
        };

        // 📰 신문사 (언론사)
        let pressElement = document.querySelector(".press_logo img, .press_logo");
        if (pressElement) {
            extractedData.press = pressElement.alt || pressElement.innerText.trim();
        }

        // 🏷️ 기사 제목
        let titleElement = document.querySelector("h2#title_area, h1.media_end_headline, .article_title");
        if (titleElement) {
            extractedData.title = titleElement.innerText.trim();
        }

        // ✍ 기자명
        let reporterElement = document.querySelector(".byline, .journalistcard_summary_name, .reporter");
        if (reporterElement) {
            extractedData.reporter = reporterElement.innerText.trim();
        }

        // 🗓 작성일
        let dateElement = document.querySelector(".media_end_head_info_datestamp_bunch ._ARTICLE_DATE_TIME, .article_date");
        if (dateElement) {
            extractedData.date = dateElement.innerText.trim();
        }

        // 🔄 수정일 (있다면)
        let updatedElement = document.querySelector(".media_end_head_info_datestamp_bunch ._ARTICLE_MODIFY_DATE_TIME, .article_modify");
        if (updatedElement) {
            extractedData.updated = updatedElement.innerText.trim();
        }

        // 📜 기사 본문
        let contentElement = document.querySelector("#dic_area, .article_body, .news_end");
        if (contentElement) {
            extractedData.content = contentElement.innerText.trim();
        }

        // ❌ 데이터가 하나도 없을 경우
        if (!extractedData.content) {
            alert("추출할 기사 내용이 없습니다!");
            return;
        }

        // ✅ 저장
        chrome.storage.local.set({ extractedData }, () => {
            if (chrome.runtime.lastError) {
                alert("저장 중 오류가 발생했습니다!");
            } else {
                alert("기사 내용이 추출되었습니다!");
            }
        });
    }
});
