//request.js
import axios from "axios";
// import qs from "qs";
import { Message } from 'element-ui'
// import store from '../vuex/store'
// import router from 'vue-router'

// axios.defaults.baseURL = "http://localhost:2222/"

axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    if (config.method === 'post'){

        // ? config.data = config.data
        // : config.params = {...config.params};
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['token'] = typeof (localStorage.token) == 'undefined' ? '' : localStorage.token
    return config;
  }, error => {
    Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(
  response => {  //成功请求到数据
    var data = response.data
    if (data.status == 1) return data.data
    
    //status == 5 Go To Login
    if(data.status == 5) {
      Message.warning("登录信息过期, 即将打开登录页面..")
      setTimeout(()=>{window.location.href="/#/login"}, 1000);
      
      return Promise.reject(data.msg)
    }else if (data.status == 2){
      Message.warning(data.msg)
      return Promise.reject(data.msg)
    }
    return data.data
    
  },
  error => {  //响应错误处理
      Message.error('服务器已关闭...')

      return Promise.reject(error)
  }
);


export default axios;