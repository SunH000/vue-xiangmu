// 路由器构造函数
import Vue from "vue";
import VueRouter from "vue-router";


import routes from "./routes";

//声明使用vue插件
Vue.use(VueRouter);

export default new VueRouter({
  mode: "history", //不带#模式

  //配置所有路由 注册
  routes,
});
