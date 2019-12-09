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

chrome.browserAction && chrome.browserAction.onClicked.addListener(function(tab) {
    openTab();
});

// chrome.contextMenus && chrome.contextMenus.create({
//     title: '使用度娘搜索：%s', // %s表示选中的文字
//     contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
//     onclick: function(params)
//     {
//         // 注意不能使用location.href，因为location是属于background的window对象
//         chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
//     }
// });

// chrome.contextMenus.create({
//     type: 'normal', // 类型，可选：["normal", "checkbox", "radio", "separator"]，默认 normal
//     title: '菜单的名字', // 显示的文字，除非为“separator”类型否则此参数必需，如果类型为“selection”，可以使用%s显示选定的文本
//     contexts: ['page'], // 上下文环境，可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认page
//     onclick: function(){}, // 单击时触发的方法
//     parentId: 1, // 右键菜单项的父菜单项ID。指定父菜单项将会使此菜单项成为父菜单项的子菜单
//     documentUrlPatterns: 'https://*.baidu.com/*' // 只在某些页面显示此右键菜单
// });
// // 删除某一个菜单项
// chrome.contextMenus.remove(menuItemId);
// // 删除所有自定义右键菜单
// chrome.contextMenus.removeAll();
// // 更新某一个菜单项
// chrome.contextMenus.update(menuItemId, updateProperties);
