import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../store/auth'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    let isLoggedIn = (typeof localStorage.getItem('user-token') !== 'undefined' && localStorage.getItem('user-token') !== null);
    let role = localStorage.getItem('role')
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (isLoggedIn) {
        next()
        return
      }
      next('/login')
    } else {
      next()
    }
  })

  return Router
}
