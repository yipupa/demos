import Vue from 'vue'
import Vuex from 'vuex'
import { aboutModal } from './aboutModal'
import { homeModal } from './homeModal'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        about: aboutModal,
        home: homeModal
    }
})
