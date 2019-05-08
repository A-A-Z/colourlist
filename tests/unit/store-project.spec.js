import { createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { SAVE_STATES } from '@/constants'
import { project, cloud } from '@/store/modules'
import { SET_SAVE_STATE, SET_PROJECT, SET_TITLE } from '@/store/mutation-types.js'
import { ON_TITLE_CHANGE } from '@/store/action-types'

Vue.use(Vuex)

describe('project mutations', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { project } })
  })

  it('SET_PROJECT', () => {
    store.commit(`project/${SET_PROJECT}`, { id: 10, title: 'Test Title' })
    expect(store.state.project.title).toEqual('Test Title')
    expect(store.state.project.id).toEqual(10)
  })

  it('SET_TITLE', () => {
    store.commit(`project/${SET_TITLE}`, 'Test Title')
    expect(store.state.project.title).toEqual('Test Title')
  })
})

describe('project actions', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { project, cloud } })
  })

  it('ON_TITLE_CHANGE', () => {
    store.dispatch(`project/${ON_TITLE_CHANGE}`, 'Test Title')
    expect(store.state.project.title).toEqual('Test Title')
    expect(store.state.cloud.saveState).toEqual(SAVE_STATES.CHANGED)
  })
})
