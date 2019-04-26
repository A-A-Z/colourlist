import {
  SET_SETTING
} from '../mutation-types'

const state = () => ({
  isUk: true,
  isLowercase: true
})

const getters = {
  // TODO
}

const mutations = {
  [SET_SETTING] (state, newSetting) {
    // Object.entries(newSetting).map(([key, value]) => {
    // TODO
    // })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
