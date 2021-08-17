console.log('背景页面执行--');

// 新标签 打开 插件页面-
let tabId = null;
window.chrome.browserAction.onClicked.addListener(function(){
    var main = window.chrome.extension.getURL("main.html");
    tabId ? window.chrome.tabs.update(tabId, {selected: true}) : window.chrome.tabs.create({"url": main}, function(tab){
        tabId = tab.id;
    });
});

window.chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if(request.action == 'pinduoduo') {

        window.chrome.windows.create({url:'http://yangkeduo.com/orders.html'},function (tab) { 
        console.log('tab', tab);
        })
        console.log('111');
        sendResponse('pinduoduo ---')
    }
 })








