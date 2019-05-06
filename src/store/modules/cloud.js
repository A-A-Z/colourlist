import { SAVE_STATES } from '@/constants'
import { auth, ProjectCollection } from '@/api/firebase.js'
import {
  SET_COLOURS,
  SET_PROJECT,
  SET_SAVE_STATE,
  SET_USER
} from '../mutation-types'
import { CONNECT, CREATE, LOAD, UPDATE } from '../action-types'

const state = () => ({
  saveState: SAVE_STATES.MOUNTED,
  user: null
})

const mutations = {
  [SET_SAVE_STATE] (state, newState) {
    state.saveState = newState
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

  [CREATE]: () => {
    /* TODO */
    console.log('Create...')
  },

  async [LOAD] ({ commit }, projectId) {
    commit(SET_SAVE_STATE, SAVE_STATES.LOADING)

    const { docs } = await ProjectCollection.where('id', '==', projectId).get()
    if (docs.length) {
      // project found
      const project = docs[0].data()
      commit(`colourList/${SET_COLOURS}`, project, { root: true })
      commit(`project/${SET_PROJECT}`, { id: project.id, title: project.name }, { root: true })
      commit(SET_SAVE_STATE, SAVE_STATES.READY)
    } else {
      // project not found
      commit(SET_SAVE_STATE, SAVE_STATES.ERROR)
      console.error('Project not found') // TODO error handling
    }
  },

  [UPDATE]: () => {
    /* TODO */
    console.log('Update...')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
