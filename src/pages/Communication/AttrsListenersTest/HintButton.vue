<template>
  <a href="javascript:" :title="title">
    <!-- 
      不确定向子组件el-button传递什么属性, 绑定什么事件监听
      需要由我的父组件传递过, 我再传递给我的子组件标签el-button
      v-bind="$attrs": 能将所有父组件传递过的属性(不包括props)都传递给子组件
      v-on="$listeners">: 能将所有父组件给我绑定的监听都绑定给子组件
     -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
/* 对el-button进行二次封装, 实现使用按钮能有hover的文本提示 */
export default {
  props: ['title'],
  mounted () {
    console.log('HintButton', this.$attrs, this.$listeners)
  }
}
</script>

<style>

</style>