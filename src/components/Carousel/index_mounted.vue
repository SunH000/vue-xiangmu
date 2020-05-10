<template>
  <!-- <div class="swiper-container" id="swiper"> -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  // 包文件夹: 根目录下有一个package.json文件 
  import Swiper from 'swiper' // 去node_modules文件中找swiper文件夹, 根据package.json的main来确定要加载模块

  export default {
    name: 'Carousel',
    
    props: { // 声明接收属性
      carouselList: Array
    },

    mounted () { //  floors通过此方式创建的swiper
      if (this.carouselList.length>0) { // 必须判断  数据列表已经显示了
        // 直接创建swiper对象
        this.initSwiper()
      }
    },
    // banners ==> [] 创建 ==> [...] 更新
    // floors ==> [] ==> [...] 创建
    watch: {
      /* 
      监视carouselList变化的回调函数
      当banners从[]变为[...]
      注意: 默认初始时不调用, 只有数据变化了才调用

      只要更新了数据界面就会自动更新 (称为数据绑定), 但vue更新界面是异步的
      我们更新了数据 ==> 立即同步调用监视的回调函数(界面还没有更新, 列表数据还没有显示)  ==> 异步更新界面
      */
      carouselList(value) { // banners通过此方式创建的swiper
        console.log('watch carouselList', value.length)
        // 如果有数据才去创建延迟swiper
        if (value.length>0) {
          // this.initSwiper()  // 此时列表数据还没有显示, 没有轮播的效果
          // nextTick()需要在数据更新之后界面更新前我们调用
          // 指定的回调函数什么时候执行: 这次数据更新导致的界面更新完成后立即执行
          this.$nextTick(() => {
            this.initSwiper()
          })
        }
      }
    },

    methods: {
      /* 
      创建swiper实例对象: 必须在列表数据显示之后创建才有正常轮播效果
      */
      initSwiper() {
        // new Swiper ('.swiper-container', {
        // new Swiper ('#swiper', {
        new Swiper(this.$refs.swiper, {
          // direction: 'horizontal', // 水平切换, 默认就是这个值

          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>