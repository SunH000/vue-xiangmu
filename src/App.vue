<template>
  <div>
    <Header></Header>
    <!-- 显示当前匹配的路由组件 -->
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reqBaseCategoryList, reqLogin } from "@/api";

export default {
  name: "App",

  async mounted() {
    // const result = await reqBaseCategoryList();
    // console.log("result", result);
    // const result2 = await reqLogin("13700000000", "111111");
    // console.log("result2", result2);

    const result = await reqFloors();
    console.log("mock result", result);
  },

  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
