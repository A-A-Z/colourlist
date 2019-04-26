import {
  SET_SAVE_STATE
} from '../mutation-types'

const state = () => ({
  saveState: 'ready' // TODO should be mounted
})

const mutations = {
  [SET_SAVE_STATE] (state, newState) {
    state.saveState = newState
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
