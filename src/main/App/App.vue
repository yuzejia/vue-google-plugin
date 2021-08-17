<template>
  <div class="main_app">
        <div id="app">
          <div>

              <div> 
                  数据采集页面
                  <div v-for="item in dataList" :key="item.order_id">
                   {{item.order_id}}

                  <div v-for="m in item.list" :key="m.img"> 
                    <span> {{m.name}} </span>
                    <img :src="'https:' + m.img" />

                  </div>
                   </div>
              </div>
              <div>
                  <textarea id="textarea_1" placeholder="请输入产品网址，多个网址用回车换行；" style="width: 600px;height: 200px;"></textarea>  
              </div>
              <div>
                  <button v-on:click="btn_1()" id="startCai">开始采集</button> <button id="getOrderList">获取订单数据</button>
              </div>
      
          </div>
          <div id="box">
              <iframe name="fromDxm" id="iframeId" style="width: 100%;height: 400px;" src="https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm" frameborder="0"></iframe>
          </div>
    </div>
  </div>
</template>

<script>
import Message from "../../jsext/message";
export default {
  name: 'app',
  data() {
    return {
      dataList: []
    }
  },
  created() {

    const message = new Message();

    console.log('message------', message);
    window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if(request.action === window.googlePluginEnumLibs.ORDER_LIST) {
              this.dataList = request.data
              const dd = request.data
                console.log('我是main页面，订单数据获取到了---', dd);
                sendResponse('main - 收到 数据~~~')
                
            }
        
    })
  
  },
  methods: {

    btn_1 () {
          new Message().sendMessageToContentScript({action:'pinduoduo', value:'你好，我是popup！'}, function(response) {
            console.log('来自content的回复：'+response);
          });
      console.log(1111)
      
    }
  },  
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
