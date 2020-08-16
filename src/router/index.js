import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routerPath'
Vue.use(VueRouter)

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
    // router.beforeEach((to, from, next) => {
    //     if (to.path === '/login') {
    //         sessionStorage.removeItem('user')
    //     }
    //     let user = JSON.parse(sessionStorage.getItem('user'))
    //     if (!user && to.path !== '/login') {
    //         next({ path: '/login' })
    //     } else {
    //         next()
    //     }
    // })

export default router