import { SAVE_STATES, DEFAULT_PROJECT_TITLE } from '@/constants'
import { SET_SAVE_STATE, SET_PROJECT, SET_TITLE } from '../mutation-types'
import { ON_TITLE_CHANGE } from '../action-types'

const state = () => ({
  id: null,
  title: DEFAULT_PROJECT_TITLE
})

const mutations = {
  [SET_PROJECT] (state, { id, title }) {
    state.id = id
    state.title = title
  },

  [SET_TITLE] (state, newTitle) {
    state.title = newTitle
  }
}

const actions = {
  [ON_TITLE_CHANGE]: ({ commit }, value) => {
    commit(SET_TITLE, value)
    commit(`cloud/${SET_SAVE_STATE}`, SAVE_STATES.CHANGED, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
