import { createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import colourList from '@/store/modules/colourList'
import { DEFAULT_NEW_COLOUR_INPUT } from '@/constants'
import {
  ADD_COLOUR_TO_LIST,
  NEW_COLOUR_CHANGE,
  REMOVE_COLOUR_FROM_LIST,
  SET_ACTIVE_COLOUR,
  SET_COLOURS
} from '@/store/mutation-types.js'

Vue.use(Vuex)

describe('colourList mutations', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { colourList } })
  })

  it('ADD_COLOUR_TO_LIST adds newColourInput to colours array', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#fff000')
    store.commit(`colourList/${ADD_COLOUR_TO_LIST}`)
    expect(store.state.colourList.colours).toEqual(['#fff000'])
  })

  it('ADD_COLOUR_TO_LIST resets newColourInput to default', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#fff000')
    store.commit(`colourList/${ADD_COLOUR_TO_LIST}`)
    expect(store.state.colourList.newColourInput).toEqual(DEFAULT_NEW_COLOUR_INPUT)
  })

  it('NEW_COLOUR_CHANGE change value of newColourInput', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#fff000')
    expect(store.state.colourList.newColourInput).toEqual('#fff000')
  })

  it('REMOVE_COLOUR_FROM_LIST remove colour from colours array', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ff0000', '#00ff00', '#0000ff'] })
    store.commit(`colourList/${REMOVE_COLOUR_FROM_LIST}`, '#00ff00')
    expect(store.state.colourList.colours).toEqual(['#ff0000', '#0000ff'])
  })

  it('SET_ACTIVE_COLOUR updates activeColour value', () => {
    store.commit(`colourList/${SET_ACTIVE_COLOUR}`, '#fff000')
    expect(store.state.colourList.activeColour).toEqual('#fff000')
  })

  it('SET_COLOURS set list of colours', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ff0000', '#00ff00', '#0000ff'] })
    expect(store.state.colourList.colours).toEqual(['#ff0000', '#00ff00', '#0000ff'])
  })
})
