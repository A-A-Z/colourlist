import Vue from 'vue'
import Vuex from 'vuex'
import colourList from './modules/colourList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    colourList
  }
})
