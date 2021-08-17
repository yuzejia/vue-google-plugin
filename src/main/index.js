import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);
console.log('hello main 11111');


new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
