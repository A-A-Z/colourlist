import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import { SAVE_STATES } from '@/constants'
import { db } from '@/api/firebase.js'
import {
  SET_COLOURS,
  SET_PROJECT,
  SET_SAVE_STATE,
  SET_USER,
  STORE_DB
} from '../mutation-types'
import { CONNECT, CREATE, LOAD, UPDATE, GENERATE_PROJECT_ID } from '../action-types'

Vue.use(VueFirestore)

const state = () => ({
  saveState: SAVE_STATES.MOUNTED,
  user: null,
  db: null
})

const mutations = {
  [SET_SAVE_STATE] (state, newState) {
    state.saveState = newState
  },

  [SET_USER] (state, userId) {
    state.user = userId
  },

  [STORE_DB] (state, db) {
    state.db = db
  }
}

const actions = {
  [CONNECT]: ({ commit, state }) => {
    // setup new db
    commit(STORE_DB, new db())

    // sign into firebase anonymously
    state.db.auth.signInAnonymously()
      .catch(error => {
        commit(SET_SAVE_STATE, SAVE_STATES.ERROR)
        console.error('signInAnonymously error', error) // TODO error hanlding
      })

    // set up watcher for user login
    state.db.auth.onAuthStateChanged(user => {
      commit(SET_SAVE_STATE, SAVE_STATES.READY)
      commit(SET_USER, user)
    })
  },

  [CREATE]: () => {
    /* TODO */
    console.log('Create...')
  },

  async [LOAD] ({ commit, state }, projectId) {
    if (state.db === null) {
      console.error(`Error: you must CONNECT to db before loading`)
      commit(SET_SAVE_STATE, SAVE_STATES.ERROR)
      return false
    }

    commit(SET_SAVE_STATE, SAVE_STATES.LOADING)

    const { docs } = await state.db.projects.where('id', '==', projectId).get()
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
  },

  async [GENERATE_PROJECT_ID] ({ commit, state }) {
    // TODO
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
