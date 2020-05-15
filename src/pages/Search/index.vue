<template>
  <div>
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">×</i>
            </li>

            <li class="with-x" v-for="(prop, index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" :addProp="addProp"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- <li :class="{active: options.order.indexOf('1')===0}" @click="setOrder('1')">  "1:desc" -->
                <li :class="{active: isActive('1')}" @click="setOrder('1')">  <!-- "1:desc" -->
                  <a href="javascript:">
                    综合
                    <i class="iconfont" :class="orderIcon" 
                      v-if="isActive('1')"></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active: isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:">
                    价格
                    <i class="iconfont" :class="orderIcon" v-if="isActive('2')"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in productList.goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${goods.id}`">{{goods.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination 
            :currentPage="options.pageNo" 
            :pageSize="options.pageSize"
            :total="productList.total"
            :showPageNo="3"
            @currentChange="handlCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    // props: ['keyword3', 'keyword4'],

    data () {
      return {
        // 包含所有用于搜索请求的参数数据的对象
        options: {
          category1Id: '', // 一级分类ID
          category2Id: '', // 二级分类ID
          category3Id: '', // 三级分类ID
          categoryName: '', // 分类名称
          keyword: '', // 关键字
          // trademark: '', // 品牌  "ID:品牌名称"
          props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
          order: '1:asc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
          pageNo: 1, // 当前页码
          pageSize: 5, // 每页数量
        }
      }
    },

    computed: {
      ...mapState({
        productList: state => state.search.productList
      }),

      /* 
      计算排序方式的icon类名
      */
      orderIcon () {
        return this.options.order.split(':')[1]==='desc' ? 'icondown' : 'iconup'
      }
    },

    watch: {
      /* 
      当路由跳转时只有路由参数发生了变化
      */
      $route () {
        this.updateOptions()
        // 请求获取数据
        this.$store.dispatch('getProductList', this.options)
      }
    },

    /* 
    放初始同步更新data数据的代码
    */
    beforeMount () {
      this.updateOptions()
    },

    /* 
    初始异步更新的代码
    */
    mounted () {
      console.log('Search mounted()')
      /* this.$store.dispatch('getProductList', {
        "category3Id": "61",
        "categoryName": "手机",
        "keyword": "小米",
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 10,
        "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
        "trademark": "4:小米"
      }) */

      this.getProductList()
      /* 
      const obj1 = {a: 1, b: 2, c: 3}
      const obj2 = {b: 4, d: 5}
      const obj3 = {...obj1, ...obj2, d: 6}   // {a: 1, b: 4, c: 3, d: 6}
      */

    },

    methods: {

      /* 
      异步获取指定页码的分页商品数据
      默认指定第1页
      */
      getProductList(pageNo=1) {
        // 更新options中的pageNo
        this.options.pageNo = pageNo
        // 再dispatch请求获取
        this.$store.dispatch('getProductList', this.options)
      },

      /* 
      当选择改变当前页码时的事件监听回调
      */
      handlCurrentChange (currentPage) {
        // 更新options中pageNo
        this.options.pageNo = currentPage
        // 重新请求获取指定页码的数据显示
        this.$store.dispatch('getProductList', this.options)
      },

      /* 
      判断指定flag的排序项是否是当前项
      */
      isActive (orderFlag) {
        return this.options.order.indexOf(orderFlag)===0
      },

      /* 
      设置新的排序    '1:desc'
      */
      setOrder (flag) { '0' / '1'
        // 得到原本的orderFlag和orderType
        let [orderFlag, orderType] = this.options.order.split(':')
        // 点击当前排序项: 切换排序方式
        if (flag===orderFlag) {
          orderType = orderType==='desc' ? 'asc' : 'desc'
        } else { // 点击不是当前排序项: 切换排序项, 排序方式为降序
          orderFlag = flag
          orderType = 'desc'
        }

        // 设置新的order值
        this.options.order = orderFlag + ':' + orderType
        // 重新请求显示
        this.getProductList()
      },

      /* 
      删除指定下标的属性条件
      */
      removeProp (index) {
        // 删除对应的prop
        this.options.props.splice(index, 1)
        // 重新请求数据显示
        this.getProductList()
      },

      /* 
      添加一个属性条件
      */
      addProp (attrId, value, attrName) {

        // 组装prop
        const prop = `${attrId}:${value}:${attrName}`

        // 如果已经添加过了当前属性, 直接结束
        // ["属性ID:属性值:属性名"]
        if (this.options.props.indexOf(prop)!==-1) return

        // 向options中的props添加一个prop
        this.options.props.push(prop)

        // 重新请求数据显示
        this.getProductList()
      },

      /* 
      设置新的品牌条件数据
      */
      setTrademark (trademark) {
        // 更新options中的trademark
        // this.options.trademark = trademark
        // 如果options中没有trademark属性, 必须通过set来添加
        if (!this.options.hasOwnProperty('trademark')) {
          this.$set(this.options, 'trademark', trademark)
        } else { // 如果options中有trademark属性, 直接赋值就可以了
          this.options.trademark = trademark
        }
        
        // 重新请求获取商品列表显示
        this.getProductList()
      },

      /* 
      移除品牌搜索条件
      */
      removeTrademark () {
        // 重置trademark数据
        // this.options.trademark = ''
        // delete this.options.trademark  // 不会更新界面
        this.$delete(this.options, 'trademark')

        // 重新请求获取商品列表显示
        // this.$store.dispatch('getProductList', this.options)
        this.getProductList()
      },

      /* 
      移除分类的搜索条件
      */
      removeCategory () {
        // 重置分类的条件数据
        this.options.categoryName = ''
        this.options.category1Id = ''
        this.options.category2Id = ''
        this.options.category3Id = ''
        // 重新获取数据
        // this.$store.dispatch('getProductList', this.options) // 不可以
        // 重新跳转到当前路由, 不再携带query参数, 只携带原本的params参数
        this.$router.replace(this.$route.path)  // $route.path不带query参数, 但带params参数(如果有)
      },

      /* 
      移除关键字的搜索条件
      */
      removeKeyword () {
        // 重置分类的条件数据
        this.options.keyword = ''
        // 重新获取数据
        // this.$store.dispatch('getProductList', this.options) // 不可以

        // 重新跳转到当前路由, 不再携带params参数, 只携带原本的query参数
        this.$router.replace({name: 'search', query: this.$route.query})

        // 通知Header组件也删除输入的关键字
        // 在Search, 通过事件总线对象来分发事件
        this.$bus.$emit('removeKeyword')
      },

      /* 
      根据query和params来更新options数据
      */
      updateOptions () {
        // 根据query和params更新options
        const {categoryName='', category1Id='', category2Id='', category3Id=''} = this.$route.query
        const {keyword=''} = this.$route.params
        this.options = {
          ...this.options,
          categoryName,
          category1Id,
          category2Id,
          category3Id,
          keyword,
        }
      }
    },

    components: {
      SearchSelector
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }

      .hot-sale {
        margin-bottom: 5px;
        border: 1px solid #ddd;

        .title {
          font-weight: 700;
          font-size: 14px;
          line-height: 21px;
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          margin: 0;
          padding: 5px 0 5px 15px;
        }

        .hot-list {
          padding: 15px;

          ul {
            display: flex;

            li {
              width: 25%;
              height: 100%;

              .list-wrap {

                .p-img,
                .price,
                .attr,
                .commit {
                  padding-left: 15px;
                }

                .p-img {
                  img {
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                  }
                }

                .attr {
                  width: 85%;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                }

                .price {
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .commit {
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                }
              }
            }
          }
        }
      }
    }
  }
</style>