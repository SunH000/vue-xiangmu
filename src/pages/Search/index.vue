<template>
  <div>
    <h2>接受params参数：keyword={{ $route.params.keyword }}</h2>
    <h2>接受query参数：keyword2={{ $route.query.keyword2 }}</h2>
  </div>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style lang="less" scoped></style>
