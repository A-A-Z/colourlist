import { createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { cloud } from '@/store/modules'
import { SAVE_STATES } from '@/constants'
import {
  SET_PROJECT_KEY,
  SET_SAVE_STATE,
  SET_USER,
  STORE_DB
} from '@/store/mutation-types.js'

Vue.use(Vuex)

describe('cloud mutations', () => {
  it('SET_PROJECT_KEY changes projectKey', () => {
    const state = { projectKey: null }
    cloud.mutations[SET_PROJECT_KEY](state, '123')
    expect(state.projectKey).toEqual('123')
  })

  it('SET_SAVE_STATE changes saveState', () => {
    const state = { saveState: SAVE_STATES.MOUNTED }
    cloud.mutations[SET_SAVE_STATE](state, SAVE_STATES.LOADING)
    expect(state.saveState).toEqual(SAVE_STATES.LOADING)
  })

  it('SET_USER changes user', () => {
    const state = { user: null }
    cloud.mutations[SET_USER](state, '123')
    expect(state.user).toEqual('123')
  })

  it('STORE_DB changes db', () => {
    const state = { db: null }
    cloud.mutations[STORE_DB](state, '123')
    expect(state.db).toEqual('123')
  })
})
