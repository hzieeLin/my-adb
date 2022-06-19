import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from '@/store/user'
import moduleTask from '@/store/task'
Vue.use(Vuex)
//导入cart.js
const store = new Vuex.Store({
  modules: {
    'm_user': moduleUser,
    'm_task': moduleTask
  }
})
export default store
