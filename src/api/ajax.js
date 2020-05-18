/* 
对axios进行二次封装(axios本身就是对原生ajax(xHR)的封装)   面试必说
    1. 配置通用的基础路径和超时
    2. 显示请求进度条
    3. 成功返回的数据不再是response, 而直接是响应体数据response.data
    4. 统一处理请求错误, 具体请求也可以选择处理或不处理
    5. 每次请求都携带一个userTempId请求头, 数据值在state中
*/

import axios from 'axios'
// import NProgress from 'nprogress/nprogress' // 加载nprogress包中的nprogress.js
import NProgress from 'nprogress' // 加载nprogress包中的nprogress.js  内部配置了"main": "nprogress.js"
import 'nprogress/nprogress.css' // 加载nprogress包中的nprogress.css
import store from '@/store'

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({  showSpinner:  false  }) 

/* 1. 配置通用的基础路径和超时 */
// 创建一个新axios(Axios的功能上实例)函数: 功能与axios类似(可以作为函数和对象发请求)
const instance = axios.create({
    // baseURL: 'http://182.92.128.115/api',  // 前提是后台允许ajax跨域
    baseURL: '/api', // 由代理服务器转发到http://182.92.128.115/api
    timeout: 15000, // 指定处理请求超时时间
})

// axios请求拦截器
instance.interceptors.request.use(config => {
    // console.log('请求拦截器执行')

    /* 2. 显示请求进度条 */
    NProgress.start()

    /*  5. 每次请求都携带一个userTempId请求头, 数据值在state中 */
    config.headers['userTempId'] = store.state.user.userTempId

    //6. 每次请求(已登陆)都携带一个token请求头, 数据值在state中
    const token = store.state.user.userInfo.token
    if (token) {
        config.headers['token'] = token
    }
    return config
})

// axios响应截器
instance.interceptors.response.use(
    response => {
        // console.log('响应拦截器成功回调执行')
        /* 2.2. 请求成功结束 隐藏进度条 */
        NProgress.done()
            /*  3. 成功返回的数据不再是response, 而直接是响应体数据response.data */
            // return response
        return response.data
    },
    error => {
        // console.log('响应拦截器失败回调执行')

        /* 2.2. 请求成功结束 隐藏进度条 */
        NProgress.done()

        /* 4. 统一处理请求错误, 具体请求也可以选择处理或不处理 */
        alert(`请求出错: ${error.message || '未知错误'}`)

        // return error  // 不可以这么写
        // throw error
        return Promise.reject(error)
    }
)

// 向外暴露封装好的instance
export default instance