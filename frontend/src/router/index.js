import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import auth from "./middlewares/auth"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/services',
    name: 'Services',

    component: () => import('../views/Services.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/login-admin',
    name: 'LoginAdmin',
    component: () => import('../views/Login.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(auth.loggedIn())
    if (!auth.loggedIn()) {
      next({
        path: '/login-admin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router
