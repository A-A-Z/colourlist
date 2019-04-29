import {
  ADD_COLOUR_TO_LIST,
  NEW_COLOUR_CHANGE,
  REMOVE_COLOUR_FROM_LIST,
  SET_ACTIVE_COLOUR
} from '../mutation-types'
import {
  ON_NEW_COLOUR_INPUT
} from '../action-types'
import Patterns from '../../helpers/Patterns'
import GetColourName from '../../helpers/GetColourName'

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
  },

  [REMOVE_COLOUR_FROM_LIST] (state, colour) {
    // filter out the passed colour
    state.colours = state.colours.filter(entry => entry !== colour)

    // if colour is also the active colour then clear that
    if (state.activeColour === colour) {
      state.activeColour = null
      state.newColourInput = '#'
    }
  },

  [SET_ACTIVE_COLOUR] (state, colour) {
    if (state.activeColour === colour) {
      state.activeColour = null
      state.newColourInput = '#'
    } else {
      state.activeColour = colour
      state.newColourInput = colour
    }
  }
}

const getters = {
  newColourHex: ({ newColourInput }, getters, { settings }) => {
    // return the active colour as formatted HEX
    const colour = (/^#/.test(newColourInput)) ? newColourInput : `#${newColourInput}`
    return settings.isLowercase ? colour.toLowerCase() : colour.toUpperCase()
  },

  isNewColourValid: ({ newColourInput }) => Patterns.validColour.test(newColourInput),

  colourNames: ({ colours }) => {
    let names = {}
    let nameCount = {}
    let firsts = {}

    // create names list from this.colours
    // (lets try to do this in one loop)
    for (const colour of colours) {
      let name = GetColourName(colour)
      nameCount[name] = (nameCount[name] + 1) || 1

      // checking for duplicates
      switch (nameCount[name]) {
        case 1: // new colour name
          names[colour] = name
          firsts[name] = colour
          break

        case 2: // name used once before
          names[firsts[name]] = `${name} 1` // rename the first
          /* falls through */

        default: // name used more then once
          names[colour] = `${name} ${nameCount[name]}`
      }
    }

    return names
  }
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
