<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>

          <p v-if="userInfo.name">
            <span>{{userInfo.nickName}}</span>
            &nbsp;
            <a href="javascript:" @click="logout">退出</a>
          </p>

          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">

        <!-- <form action="/xxx" class="searchForm" @submit.prevent="search"> -->
        <form action="/xxx" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge"
          placeholder="关键字" v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger" 
            @click.prevent="search" type="submit">搜索</button> <!-- 默认type为submit -->
            <!-- 
              绑定事件监听方式: @click.prevent与 form上@submit.prevent作用是一样的
              触发事件方式: 点击按钮或点击enter键(焦点在输入框)
            -->
        </form>
      </div>
    </div>
  </header>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Header',

    data () {
      return {
        keyword: ''
      }
    },

    mounted () {
      // 在Header, 通过事件总线对象绑定事件监听来接收消息, 从而可以更新数据
      this.$bus.$on('removeKeyword', () => {
        this.keyword = ''
      })
    },

    computed:{
      ...mapState({
        userInfo:state=>state.user.userInfo
      })
    },



    methods: {
      logout(){
        if (window.confirm('确定退出吗?')) {
          this.$store.dispatch('logout')
        }
      },


      search () {
        // 编程式路由导航(跳转)
          // 字符串模式
        // this.$router.push(`/search/${this.keyword}?keyword2=${this.keyword.toUpperCase()}`)
          // 对象模式  (在开发中用得比较多)
        // const keyword = this.keyword
        // if (keyword==='') {
        //    this.$router.push('/search')
        // } else {
        //   this.$router.push(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`)
        // }

        // 对象写法1:
        /* if (keyword==='') {
          this.$router.push({
            name: 'search'
          })
        } else {
          this.$router.push({
            name: 'search', 
            params: { keyword: keyword },
            query: { keyword2: keyword.toUpperCase() }
          })
        } */

        // 对象写法2:
        /* this.$router.push({
          name: 'search', 
          params: { keyword: keyword==='' ? undefined : keyword },
          query: { keyword2: keyword.toUpperCase() }
        })
        */
        
        
        /* 
        问题: 编程式路由跳转到当前路由(参数不变), 会抛出NavigationDuplicated的警告错误
        router.push(location, onComplete?, onAbort?): 如果直接指定了回调函数, push方法没有返回值
        router.push(location).then(onComplete).catch(onAbort)
            如果没有直接指定回调函数, push方法返回值为promise
            如果指定的是当前路由路径且参数数据不变化, push内部就会抛出一个失败的promise
        */
       /* 
       解决方法1: 在进行路由跳转时指定成功/失败的回调函数, 也可以catch()处理抛出的错误promise
       */
        /* 
        this.$router.push({
          name: 'search', 
          params: { keyword: keyword==='' ? undefined : keyword },
          query: { keyword2: keyword.toUpperCase() }
        }, () => {}) */
        /* 
        this.$router.push({
          name: 'search', 
          params: { keyword: keyword==='' ? undefined : keyword },
          query: { keyword2: keyword.toUpperCase() }
        }, undefined, () => {}) */
        
        /* 
        this.$router.push({
          name: 'search', 
          params: { keyword: keyword==='' ? undefined : keyword },
          query: { keyword2: keyword.toUpperCase() }
        }).catch(() => {}) 
        */

        /* this.$router.replace({ // push是重写后的方法
          name: 'search', 
          params: { keyword: keyword==='' ? undefined : keyword },
          query: { keyword2: keyword.toUpperCase() }
        }) */

        const keyword = this.keyword

        const location = { // push是重写后的方法
          name: 'search', 
        }
        // 如果keyword有值, 指定params
        if (keyword) {
          location.params = {keyword}
        }

        // 同时还要携带当前原本的query
        const {query} = this.$route
        location.query = query

        // 跳转到Search
        // 如果当前在Search, 使用replace(), 否则使用push
        // if (this.$route.name==="search") {
        if (this.$route.path.indexOf('/search') === 0) {
          this.$router.replace(location)
        } else {
          this.$router.push(location)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            &+a {
              border-left: 1px solid #b3aeae;
            }
          }

        }

      }
    }

    &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>