chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

function openTab() {
	const url = chrome.extension.getURL("html/index.html");
	// var oIni = JSON.parse(localStorage['jhIni'] || {});
	// if(oIni.openJhMode === 'tab') {
		chrome.tabs.create({"url": url, "selected":true});
	// }else{
	// 	chrome.windows.create({url: url, type: "popup", width: 1024, height: 768});
	// }
}

chrome.browserAction.onClicked.addListener(function(tab) {
	openTab();
});