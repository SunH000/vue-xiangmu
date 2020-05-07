import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import TypeNav from "@/components/TypeNav";
import store from "./store";
import "./mock/mockServer";
Vue.config.productionTip = false;

//注册全局组件
Vue.component("TypeNav", TypeNav);

new Vue({
  render: (h) => h(App),
  router, //配置路由器
  store,
}).$mount("#app");
