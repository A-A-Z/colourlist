import { SAVE_STATES } from '../../constants'
import {
  SET_SAVE_STATE
} from '../mutation-types'

const state = () => ({
  saveState: SAVE_STATES.READY // TODO should be mounted
})

const mutations = {
  [SET_SAVE_STATE] (state, newState) {
    state.saveState = SAVE_STATES[newState]
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
