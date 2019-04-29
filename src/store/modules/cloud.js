import { SAVE_STATES } from '../../constants'
import {
  SET_SAVE_STATE
} from '../mutation-types'
import {
  CONNECT,
  CREATE,
  LOAD,
  UPDATE
} from '../action-types'

const state = () => ({
  saveState: SAVE_STATES.READY // TODO should be MOUNTED
})

const mutations = {
  [SET_SAVE_STATE] (state, newState) {
    state.saveState = SAVE_STATES[newState]
  }
}

const actions = {
  [CONNECT]: () => { /* TODO */ },

  [CREATE]: () => { /* TODO */ },

  [LOAD]: () => { /* TODO */ },

  [UPDATE]: () => { /* TODO */ }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
