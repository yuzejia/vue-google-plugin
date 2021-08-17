console.log('content  ----');
// 数据发送
var sendMessageToBackground = function (action, options, callback) {
    window.chrome.runtime.sendMessage('', {sign: 'signDxm', action: action, data: options}, callback)
};

// 进行 订单列表 数据 抓取
var taobaoOrderSetTime = null;
var domNoteInsertedFn = function(){

    var wn = window.name;
    if (wn.indexOf('fromDxm') !== -1) {

        window.$('#J_SiteNav, #J_MtSideMenu, #J_xiaomi_dialog').css('display', 'none');
        window.$('#J_Col_Main').css('padding-top', '0px');
        window.$('.mt-header:first').css('display', 'none');
        // 监听 节点 移除 后 新增节点事件 来进行 页面 操作
        window.$(document).off('DOMNodeInserted', '#J_bought_main')
        .on('DOMNodeInserted', '#J_bought_main', function(){
            if(taobaoOrderSetTime !== null){
                clearTimeout(taobaoOrderSetTime);
                taobaoOrderSetTime = null;
            }
            taobaoOrderSetTime = setTimeout(function(){
                clearTimeout(taobaoOrderSetTime);
                taobaoOrderSetTime = null;
                window.$(document).off('DOMNodeInserted', '#J_bought_main');
                window.$('#J_bought_main').css('margin-left', '0px').find('span[data-nick]').html('<span class="dxm-btn dxm-btn-primary dxm-fetch-btn dxmFetchBtn bindPlatformOrder" style="padding: 0 5px;color: #428bac; cursor: pointer;">' +
                    '<span style="display:inline-block;margin-top:2px;width: 15px;height: 15px;vertical-align:top;">' +
                    '</span> 转采购单</span>');
                domNoteInsertedFn();
                  // 获取订单列表
                const list = window.$('#tp-bought-root .js-order-container');
                
                order_list(list);
            }, 500);
        });

        window.$(document).off('click', '.bindPlatformOrder').on('click', '.bindPlatformOrder', function(){ 
            alert(11111)
        })
    }
};
domNoteInsertedFn();
// ----------------------



// 获取订单详情信息
var orderList = [];
var order_list = function(list) {
    orderList = [];
    // const listData = $(list).find('div[data-id]');

    for (let index = 0; index < list.length; index++) {
        let order_obj = {
            time: null,
            name: null,
            order_id: null,
            list: []
        }
        // 获取每项的订单号
        const order_id = orderIdList(list[index]);
        order_obj.order_id = order_id;

        // 获取每项的 日期
        const time = timeName(list[index]);
        order_obj.time = time;

        // 抓取 每项订单下的商品详情列表 （可存在多个商品）
       const _detailItemList = ProductDetails(list[index]);
       order_obj.list = _detailItemList
       orderList.push(order_obj);


    }

    // 向 main 发送信息
    console.log(orderList);

    sendMessageToBackground('order_list', orderList, function(data) {
        console.log(data);
    })
}

// 获取订单号
function orderIdList(item) {
    const orderId = window.$(item).find('.bought-wrapper-mod__head-info-cell___29cDO>span:first>span:last').text();
    return orderId;
}

// 获取订单日期
function timeName(item) {
    const time = window.$(item).find('.bought-wrapper-mod__head-info-cell___29cDO>.bought-wrapper-mod__checkbox-label___3Va60>span:last').text();
    return time;
}

// 获取每项商品详情列表 --
function ProductDetails(item) {
    let detailItemList = []

    const tr_list = window.$(item).find('table>tbody:last>tr');

    for (let index = 0; index < tr_list.length; index++) {
        let detailObj = {
            name: null,
            img: null,
        }
        const t = tr_list[index];
        const img = window.$(t).find('.production-mod__pic___G8alD>img').attr("src")
        const name = window.$(t).find('.ml-mod__container___2DOxT>div:eq(1)>p:first>a:first>span:eq(1)').text();
        if(img) {
            detailObj.img = img;
            detailObj.name = name;
            detailItemList.push(detailObj)
        }
    }
    return detailItemList;
}

window.chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.action === window.googlePluginEnumLibs.GET_ORDER_LIST) {
        console.log('订单数据获取到了---', request.data);
        sendResponse('content.js 收到了信息')
        
    }

    if(request.action == 'main_test') {

        sendResponse(orderList)
    }

})



// -------------------------- dom  插入 节点 ---------------

const addPurchase = window.$('#addPurchase').find('.modal-header')
console.log('addPurchase', addPurchase);
window.$(addPurchase).append('<span> 加载订单 </span>');
console.log(window.$('#addPurchase').find('.modal-body'));
window.$('#addPurchase').find('.modal-body>.row').css('display', 'none')

const d = `<div id="box">
<iframe name="fromDxm" id="iframeId" style="width: 100%;height: 400px;" src="https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm" frameborder="0"></iframe>
</div>`
window.$('#addPurchase').find('.modal-body').append(d);
// --- end --
