chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openDetailsPage") {
        chrome.tabs.create({ url: "details.html" });
    }
});
