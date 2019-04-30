import { SAVE_STATES } from '@/constants'
import { db, auth, ProjectCollection } from '@/api/firebase.js'
import {
  SET_COLOURS,
  SET_SAVE_STATE,
  SET_TITLE,
  SET_USER
} from '../mutation-types'
import { CONNECT, CREATE, LOAD, UPDATE } from '../action-types'

const state = () => ({
  saveState: SAVE_STATES.MOUNTED,
  title: 'Untitled project',
  user: null
})

const mutations = {
  [SET_SAVE_STATE] (state, newState) {
    state.saveState = newState
  },

  [SET_TITLE] (state, newTitle) {
    state.title = newTitle
  },

  [SET_USER] (state, userId) {
    state.user = userId
  }
}

const actions = {
  [CONNECT]: ({ commit }) => {
    // sign into firebase anonymously
    auth.signInAnonymously()
      .catch(error => {
        commit(SET_SAVE_STATE, SAVE_STATES.ERROR)
        console.error('signInAnonymously error', error) // TODO error hanlding
      })

    // set up watcher for user login
    auth.onAuthStateChanged(user => {
      commit(SET_SAVE_STATE, SAVE_STATES.READY)
      commit(SET_USER, user)
    })
  },

  [CREATE]: () => { /* TODO */ },

  async [LOAD] ({ commit }, projectId) {
    commit(SET_SAVE_STATE, SAVE_STATES.LOADING)

    const { docs } = await ProjectCollection.where('id', '==', projectId).get()
    if (docs.length) {
      // project found
      const project = docs[0].data()
      commit(`colourList/${SET_COLOURS}`, project, { root: true })
      commit(SET_TITLE, project.name)
      commit(SET_SAVE_STATE, SAVE_STATES.READY)
    } else {
      // project not found
      commit(SET_SAVE_STATE, SAVE_STATES.ERROR)
      console.error('Project not found') // TODO error handling
    }
  },

  [UPDATE]: () => { /* TODO */ }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
