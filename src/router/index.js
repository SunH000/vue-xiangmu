/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'


// 声明使用vue插件
Vue.use(VueRouter)

/* 
解决2: 修正Vue原型上的push和replace方法 (优秀)
*/
// 缓存原型上的push方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
    // 重新指定原型上的push方法
VueRouter.prototype.push = function(location, onComplete, onAbort) {
    console.log('push()', location, onComplete, onAbort)
        // this是路由器对象 $router
        // 如果调用push, 传递了成功或者失败的回调函数
    if (onComplete || onAbort) {
        // 让原来的push方法进行处理
        originPush.call(this, location, onComplete, onAbort) // 不用返回, 因为执行的结果返回是undfined
    } else { // 如果调用push, 没传递了成功或者失败的回调函数, 可能会抛出失败的promise, 需要catch一下
        return originPush.call(this, location).catch((error) => {
                console.log('catch 到重复请求的error')
                    // throw error // 必然不对

                // return undefined // 默认如果重复请求当前路由(参数也一样), 会导致后面then指定的成功回调函数

                return new Promise(() => {}) // 返回一个pending状态的promise, 中断promise链, 后面成功的回调就不会调用

            }) // 必须返回产生的promise对象
    }
}

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
    if (onComplete || onAbort) {
        originReplace.call(this, location, onComplete, onAbort)
    } else {
        return originReplace.call(this, location).catch(() => {
            console.log('catch error2')
            return new Promise(() => {})
        })
    }
}


const router = new VueRouter({
    mode: 'history', // 不带#的模式
    routes, // 配置所有路由
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 } // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
    }
})

/* // 注册全局前置守卫
router.beforeEach((to, from, next) => { // 在即将跳转到目标前回调
  console.log('beforeEach()', to, from)

  //放行
  next()
})

// 注册全局后置守卫
router.afterEach((to, from) => { // 已经跳转到目标路由才调用
  console.log('afterEach()')
}) */

// 所有需要进行登陆检查的路由路径的数组
const checkPaths = ['/trade', '/pay', '/center'] // 所有以它开头的路径都需要检查

/* a.只有登陆了, 才能查看交易/支付/个人中心界面 */
router.beforeEach((to, from, next) => { // 在即将跳转到目标前回调
    const targetPath = to.path // 有可能是/paysuccess  /center/myorder

    // 如果目标路由是需要进行登陆检查的
    // const isCheckPath = !!checkPaths.find(path => targetPath.indexOf(path)===0)
    const isCheckPath = checkPaths.some(path => targetPath.indexOf(path) === 0)

    if (isCheckPath) {
        // 如果已经登陆了, 放行
        if (store.state.user.userInfo.name) {
            next()
        } else { // 如果没有登陆, 强制自动跳转到登陆页面
            next('/login?redirect=' + targetPath)
        }
    } else { // 如果目标路由不需要进行登陆检查, 直接放行
        next()
    }
})

export default router