import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const constantRouterMap = [
    // {
    //     path: '/',
    //     redirect: '/home',
    //     hidden: true
    // },
    {
        path:"/home",
        component:() => require('../views/home.vue'),
        hidden: true
    },
]

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRouterMap
  })