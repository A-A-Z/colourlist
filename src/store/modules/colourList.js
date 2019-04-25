import {
  ADD_COLOUR_TO_LIST,
  NEW_COLOUR_CHANGE
} from '../mutation-types';

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

}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
