import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页全部加载
import Layout from '@/views/layout'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

import store from '@/store/index'

// 其他页面进行按需导入，路由懒加载
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list.vue')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Myorder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'category',
          component: Category
        },
        {
          path: 'cart',
          component: Cart
        },
        {
          path: 'user',
          component: User
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/list',
      component: SearchList
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/prodetail/:id',
      component: Prodetail
    },
    {
      path: '/myorder',
      component: Myorder
    }
  ]
})

// 配置前置路由守卫
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 判断用户访问的路径是否需要权限
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  // 如果需要权限，判断用户是否登录
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
