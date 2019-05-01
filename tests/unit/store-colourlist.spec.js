import { createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import colourList from '@/store/modules/colourList'

import {
  // ADD_COLOUR_TO_LIST,
  // NEW_COLOUR_CHANGE,
  // REMOVE_COLOUR_FROM_LIST,
  // SET_ACTIVE_COLOUR,
  // SET_COLOURS
  SET_ACTIVE_COLOUR
} from '@/store/mutation-types.js'

Vue.use(Vuex)

describe('colourList mutations', () => {
  it('Test me', () => {
    const store = new Vuex.Store({ modules: { colourList } })
    store.commit(`colourList/${SET_ACTIVE_COLOUR}`, '#fff000')
    expect(store.state.colourList.activeColour).toEqual('#fff000')
  })
})
