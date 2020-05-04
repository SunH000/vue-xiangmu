<template>
  <div>
    <Header></Header>
    <!-- 显示当前匹配的路由组件 -->
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
