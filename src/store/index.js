import Vue from 'vue'
import Vuex from 'vuex'
import { colourList, settings, cloud } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    colourList,
    settings,
    cloud
  }
})
