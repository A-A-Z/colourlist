import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import { SAVE_STATES } from '@/constants'
import { db } from '@/api/firebase.js'
import {
  SET_COLOURS,
  SET_PROJECT,
  SET_PROJECT_KEY,
  SET_SAVE_STATE,
  SET_USER,
  STORE_DB
} from '../mutation-types'
import { CONNECT, CREATE, LOAD, UPDATE, GENERATE_PROJECT_ID } from '../action-types'

Vue.use(VueFirestore)

const state = () => ({
  saveState: SAVE_STATES.MOUNTED,
  user: null,
  db: null,
  projectKey: null
})

const mutations = {
  [SET_PROJECT_KEY] (state, key) {
    state.projectKey = key
  },

  [SET_SAVE_STATE] (state, newSaveState) {
    state.saveState = newSaveState
  },

  [SET_USER] (state, userId) {
    state.user = userId
  },

  [STORE_DB] (state, db) {
    state.db = db
  }
}

const getters = {
  getProjectData: (state, getters, { project, colourList }) => {
    return {
      ...project,
      list: colourList.colours
    }
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
      commit(SET_PROJECT_KEY, docs[0].id)
      commit(`colourList/${SET_COLOURS}`, project, { root: true })
      commit(`project/${SET_PROJECT}`, { id: project.id, title: project.name }, { root: true })
      commit(SET_SAVE_STATE, SAVE_STATES.READY)
    } else {
      // project not found
      commit(SET_SAVE_STATE, SAVE_STATES.ERROR)
      console.error('Project not found') // TODO error handling
    }
  },

  async [UPDATE] ({ commit, state, getters }) {
    const { db, projectKey } = state
    const projectData = getters.getProjectData

    commit(SET_SAVE_STATE, SAVE_STATES.SAVING)
    await state.db.projects.doc(projectKey).update(projectData)
    commit(SET_SAVE_STATE, SAVE_STATES.SAVED)
  },

  async [GENERATE_PROJECT_ID] ({ commit, state }) {
    // creat a string of random chars of X length
    const randId = length => Math.random().toString(36).substr(2, length)

    // set new id
    const newId = randId(5)

    // check ID
    // TODO
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
