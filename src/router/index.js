import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import My from '@/components/my/My'
import Time from '@/components/time/Time'
import AllTime from '@/components/time/AllTime'
import AbsTime from '@/components/time/AbsTime'
import Task from '@/components/task/Task'
import Weather from '@/components/Weather'
import Tree from '@/components/tree/Tree'
import Kanban from '@/components/task/Kanban'
import Master from "@/components/master/Master";
import Clock from "@/components/Clock";
import Test from "@/components/Test";
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login', component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {path: '/my', component: My},
      {path: '/statistics', component: Master},
      {path: '/record', component: Tree},
      {path: '/kanban', component: Kanban},
      {path: '/absorbed', component: Time},
      {path: '/more', component: My},
    ]
  },
  {
    path: '/alltime', component: AllTime
  },
  { path: '/abstime', component: AbsTime},
  {
    path: '/test',
    component: Test
  },
  {path: '/task', component: Task},
  {path: '/clock', component: Clock}
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next)=> {
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router
