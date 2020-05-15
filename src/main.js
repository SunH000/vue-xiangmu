import Vue from "vue";
import App from "@/App";
import 'swiper/css/swiper.min.css'

import router from "./router";
import TypeNav from "@/components/TypeNav";
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from "./store";
import "./mock/mockServer";
import './validate'
import * as API from '@/api'
// 去掉不是生产环境的提示
Vue.config.productionTip = false;

//注册全局组件
Vue.component("TypeNav", TypeNav);
Vue.component('Carousel', Carousel);
Vue.component('Pagination', Pagination);

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this
    },

    render: (h) => h(App),
    router, //配置路由器
    store,
}).$mount("#app");