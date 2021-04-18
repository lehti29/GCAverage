chrome.runtime.onInstalled.addListener(() => {
    console.log('bajs');
});

chrome.browserAction.onClicked.addListener(
    function (tab) {
        console.log('hej');
        chrome.tabs.executeScript(tab.id, {
            "file": "content.js"
        });
    });

chrome.runtime.onMessage.addListener(({ type, name }) => {
    if (type === "set-name") {
        chrome.storage.local.set({ name });
    }
});

chrome.action.onClicked.addListener((tab) => {
    console.log('wazza')
    chrome.storage.local.get(["name"], ({ name }) => {
        chrome.tabs.sendMessage(tab.id, { name });
    });
});