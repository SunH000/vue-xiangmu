<template>
  <div>
    <Header/>
    <!-- 显示当前匹配的路由组件 -->
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reqFloors} from "@/api";

export default {
  name: "App",

  async mounted() {
    //通过异步action获取异步数据到vuex的state中
    this.$store.dispatch('getBaseCategoryList')
  },

  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
