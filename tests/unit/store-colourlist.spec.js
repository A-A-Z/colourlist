import { createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { colourList, settings, cloud } from '@/store/modules'
import { DEFAULT_NEW_COLOUR_INPUT, SAVE_STATES } from '@/constants'
import {
  ADD_COLOUR_TO_LIST,
  EDIT_COLOUR_IN_LIST,
  NEW_COLOUR_CHANGE,
  REMOVE_COLOUR_FROM_LIST,
  SET_ACTIVE_COLOUR,
  SET_COLOURS,
  SET_SAVE_STATE,
  SET_SETTING
} from '@/store/mutation-types.js'
import {
  ON_NEW_COLOUR_INPUT,
  ON_COLOUR_SUBMIT
} from '@/store/action-types'

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
  let mutations
  let mockColourList

  beforeEach(() => {
    mutations = {
      [ADD_COLOUR_TO_LIST]: jest.fn(),
      [EDIT_COLOUR_IN_LIST]: jest.fn(),
      [NEW_COLOUR_CHANGE]: jest.fn(),
      [SET_ACTIVE_COLOUR]: jest.fn(),
      [SET_SAVE_STATE]: jest.fn()
    }

    mockColourList = {
      ...colourList,
      ...{ mutations }
    }
  })

  it('ON_NEW_COLOUR_INPUT calls NEW_COLOUR_CHANGE with new value', () => {
    const stateValues = {
      activeColour: null,
      colours: [],
      newColourInput: '#fff00'
    }
    const store = new Vuex.Store({
      modules: {
        colourList: { ...mockColourList, ...{ state: () => stateValues } },
        settings,
        cloud
      }
    })
    store.dispatch(`colourList/${ON_NEW_COLOUR_INPUT}`, '#fff000')
    expect(mutations.NEW_COLOUR_CHANGE).toHaveBeenCalledWith(stateValues, '#fff000')
  })

  it('ON_NEW_COLOUR_INPUT resets NEW_COLOUR_CHANGE if colour is invalid', () => {
    const stateValues = {
      activeColour: null,
      colours: [],
      newColourInput: '#fff00'
    }
    const store = new Vuex.Store({
      modules: {
        colourList: { ...mockColourList, ...{ state: () => stateValues } },
        settings,
        cloud
      }
    })
    store.dispatch(`colourList/${ON_NEW_COLOUR_INPUT}`, '#fff00x')
    expect(mutations.NEW_COLOUR_CHANGE).toHaveBeenNthCalledWith(2, stateValues, stateValues.newColourInput);
  })

  it('ON_NEW_COLOUR_INPUT does not reset NEW_COLOUR_CHANGE if colour is valid', () => {
    const stateValues = {
      activeColour: null,
      colours: [],
      newColourInput: '#fff00'
    }
    const store = new Vuex.Store({
      modules: {
        colourList: { ...mockColourList, ...{ state: () => stateValues } },
        settings,
        cloud
      }
    })
    store.dispatch(`colourList/${ON_NEW_COLOUR_INPUT}`, '#fff000')
    expect(mutations.NEW_COLOUR_CHANGE).toHaveBeenCalledTimes(1)
  })

  it('ON_COLOUR_SUBMIT calls ADD_COLOUR_TO_LIST if no active colour', () => {
    const stateValues = {
      activeColour: null,
      colours: [],
      newColourInput: '#ffffff'
    }
    const store = new Vuex.Store({
      modules: {
        colourList: { ...mockColourList, ...{ state: () => stateValues } },
        settings,
        cloud
      }
    })
    store.dispatch(`colourList/${ON_COLOUR_SUBMIT}`)
    expect(mutations.ADD_COLOUR_TO_LIST).toHaveBeenCalled()
  })

  it('ON_COLOUR_SUBMIT calls EDIT_COLOUR_IN_LIST if has active colour', () => {
    const stateValues = {
      activeColour: '#00ff00',
      colours: [ '#00ff00' ],
      newColourInput: '#ffffff'
    }
    const store = new Vuex.Store({
      modules: {
        colourList: { ...mockColourList, ...{ state: () => stateValues } },
        settings,
        cloud
      }
    })
    store.dispatch(`colourList/${ON_COLOUR_SUBMIT}`)
    expect(mutations.EDIT_COLOUR_IN_LIST).toHaveBeenCalled()
  })

  it('ON_COLOUR_SUBMIT resets active colour if has active colour', () => {
    const stateValues = {
      activeColour: '#00ff00',
      colours: [ '#00ff00' ],
      newColourInput: '#ffffff'
    }
    const store = new Vuex.Store({
      modules: {
        colourList: { ...mockColourList, ...{ state: () => stateValues } },
        settings,
        cloud
      }
    })
    store.dispatch(`colourList/${ON_COLOUR_SUBMIT}`)
    expect(mutations.SET_ACTIVE_COLOUR).toHaveBeenCalledWith(stateValues, null)
  })

  it('ON_COLOUR_SUBMIT sets save state to "Changed"', () => {
    const stateValues = {
      activeColour: null,
      colours: [ '#00ff00' ],
      newColourInput: '#ffffff'
    }
    const cloudState = { db: null, saveState: 'mounted', user: null }
    const store = new Vuex.Store({
      modules: {
        colourList: { ...mockColourList, ...{ state: () => stateValues } },
        settings,
        cloud: { ...cloud, ...{ mutations, state: () => cloudState } }
      }
    })
    store.dispatch(`colourList/${ON_COLOUR_SUBMIT}`)
    expect(mutations.SET_SAVE_STATE).toHaveBeenCalledWith(cloudState, SAVE_STATES.CHANGED)
  })

  it('ON_COLOUR_SUBMIT resets NEW_COLOUR_CHANGE', () => {
    const stateValues = {
      activeColour: null,
      colours: [ '#00ff00' ],
      newColourInput: '#ffffff'
    }
    const store = new Vuex.Store({
      modules: {
        colourList: { ...mockColourList, ...{ state: () => stateValues } },
        settings,
        cloud
      }
    })
    store.dispatch(`colourList/${ON_COLOUR_SUBMIT}`)
    expect(mutations.NEW_COLOUR_CHANGE).toHaveBeenCalledWith(stateValues, DEFAULT_NEW_COLOUR_INPUT)
  })
})
