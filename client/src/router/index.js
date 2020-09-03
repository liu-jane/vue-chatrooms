import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo} from '../utils/user'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component:() => import('@/views/chat')
    },
    {
      path: '/login',
      component:() => import('@/views/login')
    },
    {
      path: '/personal',
      component:() => import('@/views/personal')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if(!getUserInfo() && to.path !== '/login'){
    next({ path: '/login' })
  }
 
  next()
})

export default router