import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false });

const instance = axios.create({
  baseURL: "/api",
  timeout: 15000, //超时时间
});

//axios请求拦截器
instance.interceptors.request.use((config) => {
  NProgress.start();

  return config;
});

//axios响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log("响应拦截器成功回调函数执行");
    NProgress.done();
    return response.data;
  },
  (error) => {
    console.log("响应拦截器失败回调函数执行");

    NProgress.done();

    //统一处理请求错误
    alert(`请求出错: ${error.message || "未知错误"}`);
    return Promise.reject(error);
  }
);

//暴露封装好的instance
export default instance;
