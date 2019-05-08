import { createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { colourList, settings, cloud } from '@/store/modules'
import { DEFAULT_NEW_COLOUR_INPUT, SAVE_STATES } from '@/constants'
import {
  ADD_COLOUR_TO_LIST,
  NEW_COLOUR_CHANGE,
  REMOVE_COLOUR_FROM_LIST,
  SET_ACTIVE_COLOUR,
  SET_COLOURS,
  SET_SETTING
} from '@/store/mutation-types.js'
import { ON_NEW_COLOUR_INPUT } from '@/store/action-types'

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

describe('colourList getters', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { colourList, settings } })
  })

  it('newColourHex to pass Hex colour', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#fff000')
    expect(store.getters['colourList/newColourHex']).toEqual('#fff000')
  })

  it('newColourHex to add hash to HEX colour', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, 'fff000')
    expect(store.getters['colourList/newColourHex']).toEqual('#fff000')
  })

  it('newColourHex converts to uppercase', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#fff000')
    store.commit(`settings/${SET_SETTING}`, { isLowercase: false })
    expect(store.getters['colourList/newColourHex']).toEqual('#FFF000')
  })

  it('newColourHex converts to lowercase', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#FFF000')
    store.commit(`settings/${SET_SETTING}`, { isLowercase: true })
    expect(store.getters['colourList/newColourHex']).toEqual('#fff000')
  })

  it('isNewColourValid is true', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#fff000')
    expect(store.getters['colourList/isNewColourValid']).toEqual(true)
  })

  it('isNewColourValid is false', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#fff00x')
    expect(store.getters['colourList/isNewColourValid']).toEqual(false)
  })

  it('colourNames returns colours with names', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ffffff', '#000000', '#ff0000', '#7c2626'] })
    expect(store.getters['colourList/colourNames']).toEqual(
      {
        '#ffffff': 'White',
        '#000000': 'Black',
        '#ff0000': 'Red',
        '#7c2626': 'Crown of Thorns'
      }
    )
  })
})

describe('colourList actions', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { colourList, settings, cloud } })
  })

  it('ON_NEW_COLOUR_INPUT updates newColourInput', () => {
    store.dispatch(`colourList/${ON_NEW_COLOUR_INPUT}`, '#f')
    expect(store.state.colourList.newColourInput).toEqual('#f')
  })

  it('ON_NEW_COLOUR_INPUT invalid values do not updates newColourInput', () => {
    store.commit(`colourList/${NEW_COLOUR_CHANGE}`, '#f')
    store.dispatch(`colourList/${ON_NEW_COLOUR_INPUT}`, '#fx')
    expect(store.state.colourList.newColourInput).toEqual('#f')
  })

  it('ON_NEW_COLOUR_INPUT updates save state to changed', () => {
    store.dispatch(`colourList/${ON_NEW_COLOUR_INPUT}`, '#f')
    expect(store.state.cloud.saveState).toEqual(SAVE_STATES.CHANGED)
  })
})
