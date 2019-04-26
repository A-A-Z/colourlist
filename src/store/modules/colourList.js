import {
  ADD_COLOUR_TO_LIST,
  NEW_COLOUR_CHANGE
} from '../mutation-types'
import {
  ON_NEW_COLOUR_INPUT
} from '../action-types'
import Patterns from '../../helpers/Patterns'

const state = () => ({
  activeColour: null,
  colours: [],
  newColourInput: '#'
})

const mutations = {
  [NEW_COLOUR_CHANGE] (state, value) {
    state.newColourInput = value
  },

  [ADD_COLOUR_TO_LIST] (state) {
    let colours = state.colours.slice()
    colours.push(state.newColourInput)
    state.colours = colours
    state.newColourInput = '#'
  }
}

const getters = {
  newColourHex: ({ newColourInput }) => {
    // return the active colour as formatted HEX
    // TODO: re-add case settings
    return (/^#/.test(newColourInput)) ? newColourInput : `#${newColourInput}`
  },

  isNewColourValid: ({ newColourInput }) => Patterns.validColour.test(newColourInput)
}

const actions = {
  [ON_NEW_COLOUR_INPUT] ({ commit, getters }, value) {
    const oldValue = getters.newColourHex

    // set new value
    commit(NEW_COLOUR_CHANGE, value)

    // if new value is invalid then reset to old value
    if (!Patterns.inputColour.test(value)) {
      commit(NEW_COLOUR_CHANGE, oldValue)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
