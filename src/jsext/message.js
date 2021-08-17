
// google 插件 通信服务
class Message {

    constructor() {
        console.log('message 通讯执行--');
    }

    /**
     * 页面向 content-script 进行通讯
     * @param {*} message  {action:'main_test', value:'你好，我是popup！'} 统一采用 action 作为通讯标识
     * @param {*} callback 
     */
    sendMessageToContentScript(message, callback){
        window.chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          window.chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
            if(callback) callback(response);
          });
        });
    }

}

export default Message;