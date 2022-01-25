chrome.tabs.executeScript({
    file: 'content-script.js',
});

chrome.browserAction.onClicked.addListener(function (tab) { 
    chrome.tabs.executeScript(tab.id, {
        "file": "content-script.js"
    }, function () { 
        console.log("Script Executed .. "); 
    });
});