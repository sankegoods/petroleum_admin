import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logInfo: null,
    },
    mutations: {
        LogIn(strte, userInfo) {
            strte.logInfo = userInfo
        }
    },
    actions: {},
    getters: {

    },
    modules: {}
})