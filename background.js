// chrome.runtime.onInstalled.addListener(() => {
//     console.log('installed');
// });

// chrome.runtime.onMessage.addListener(({ type, name }) => {
//     if (type === "set-name") {
//         chrome.storage.local.set({ name });
//     }
// });

// chrome.action.onClicked.addListener((tab) => {
//     chrome.storage.local.get(["name"], ({ name }) => {
//         chrome.tabs.sendMessage(tab.id, { name });
//     });
// });

chrome.browserAction.onClicked.addListener(
    function (tab) {
        chrome.tabs.executeScript(tab.id, {
            "file": "content.js"
        });
    });