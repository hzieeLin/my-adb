import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/font_css/iconfont.css'
import '../src/assets/golbal.css'
import VCalendar from 'v-calendar'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import axios1 from 'axios'
Vue.use(ElementUI)
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:9000'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$https = axios1
//全局的post请求处理函数
Vue.prototype.postFunc = function (res) {
  if(res.status !== 200) {
    this.$message.error(res.message)
  }
  else {
    // this.$message.success(res.message)
    if(res.data === null) {
      return true
    }
    return res.token
  }
}
Vue.prototype.getFunc = function (res) {
  if(res.status !== 200) {
    this.$message.error(res.message)
  }else {
    return res.data
  }
}
//全局的时间处理函数
Vue.prototype.formatDate = function() {
  var date = new Date();
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())+ '  ';
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + hh + mm + ss
}
Vue.prototype.formatDate1 = function(date) {
  var date = new Date(date);
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())+ '日';
  return MM + DD
}
Vue.prototype.formatDate2 = function() {
  var date = new Date();
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())+ '';
  return YY + MM + DD
}
Vue.prototype.formatDate3 = function(data) {
  var date = new Date(data);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())+ '';
  return YY + MM + DD
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

