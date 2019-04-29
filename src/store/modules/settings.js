import { SET_SETTING } from '../mutation-types'

const state = () => ({
  isUk: true,
  isLowercase: true
})

const getters = {
  colourText: ({ isUk }) => isUk ? 'colour' : 'color'
}

const mutations = {
  [SET_SETTING] (state, newSetting) {
    Object.entries(newSetting).forEach(([key, value]) => {
      state[key] = value
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
