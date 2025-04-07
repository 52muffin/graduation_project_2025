document.getElementById("extract").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "extract_article" });
    });
});


document.getElementById("details").addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("details.html") });
});



document.getElementById("close").addEventListener("click", () => {
    window.close();
});
