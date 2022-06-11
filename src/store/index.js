import personalized from './personalized'
import playList from './playList'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        playList,
        personalized,
        
    }
})
