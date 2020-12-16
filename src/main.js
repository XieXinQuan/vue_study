
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/animate.css'
import './css/iconfont/iconfont.css'
import './css/index.css'
import store from './vuex/store'
//格式化时间
import moment from 'moment'
import './axios/request'

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {

  return moment(dataStr).format(pattern)
  
  })


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount("#app")

export default App;
