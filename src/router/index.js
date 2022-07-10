import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/snippet',
    component: () => import('@/view/Home'),
    children: [
      { path: '/snippet', component: () => import ('@/components/snippet') },
      { path: '/plug', component: () => import ('@/components/snippet') },
      { path: '/other', component: () => import ('@/components/snippet') }
    ],
    meta: { title: '首页' }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// 解决重复路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// router.beforeEach((to, from, next) => {
//   next()
// })
// router.afterEach((to, from) => {})
export default router
