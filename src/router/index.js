import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routerPath'
import store from '../store'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        sessionStorage.removeItem('user')
    }
    //写入sessionStorage
    // let user = JSON.parse(sessionStorage.getItem('user'))
    // if (!user && to.path !== '/login') {
    //     next({ path: '/login' })
    // }

    //使用vue 自带的vuex全局状态
    let user = store.state.logInfo
    if (!user && to.path !== '/login') {
        next({ path: '/login' })
    }
    next();
})

export default router