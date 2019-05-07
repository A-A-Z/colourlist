import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import List from '@/components/List.vue'
import { colourList } from '@/store/modules'
import { SET_ACTIVE_COLOUR, SET_COLOURS } from '@/store/mutation-types.js'

Vue.use(Vuex)

describe('List.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { colourList } })

    wrapper = shallowMount(List, {
      store
    })
  })

  it('renders List section', () => {
    expect(wrapper.findAll('.o-colour-list')).toHaveLength(1)
  })

  it('renders List with zero colours', () => {
    expect(wrapper.findAll('.o-colour-list__item')).toHaveLength(0)
  })

  it('renders List with three colours', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ff0000', '#00ff00', '#0000ff'] })
    expect(wrapper.findAll('.o-colour-list__item')).toHaveLength(3)
  })

  it('renders colour label', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ff0000'] })
    expect(wrapper.find('.o-colour-list__label').text()).toBe('Red')
  })

  it('clicking on item makes colour active', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ffffff'] })
    wrapper
      .find('.o-colour-list__item')
      .trigger('click')

    expect(store.state.colourList.activeColour).toEqual('#ffffff')
  })

  it('hitting enter on item makes colour active', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ffffff'] })
    wrapper
      .find('.o-colour-list__item')
      .trigger('keyup.enter')

    expect(store.state.colourList.activeColour).toEqual('#ffffff')
  })

  it('hitting space on item makes colour active', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ffffff'] })
    wrapper
      .find('.o-colour-list__item')
      .trigger('keyup.space')

    expect(store.state.colourList.activeColour).toEqual('#ffffff')
  })

  it('having an active colour renders that colour as active', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ff0000', '#00ff00', '#0000ff'] })
    store.commit(`colourList/${SET_ACTIVE_COLOUR}`, '#00ff00')
    expect(wrapper.findAll('.o-colour-list__item--active')).toHaveLength(1)
  })

  // TODO Why no work!?
  // it('having an active colour shows the delete icon for that colour', () => {
  //   store.commit(`colourList/${SET_COLOURS}`, { list: ['#ff0000', '#00ff00', '#0000ff'] })
  //   store.commit(`colourList/${SET_ACTIVE_COLOUR}`, '#00ff00')
  //   expect(wrapper.findAll('.o-colour-list__delete')).toHaveLength(1)
  // })

  it('renders correctly', () => {
    store.commit(`colourList/${SET_COLOURS}`, { list: ['#ff0000', '#00ff00', '#0000ff'] })
    store.commit(`colourList/${SET_ACTIVE_COLOUR}`, '#00ff00')
    expect(wrapper.element).toMatchSnapshot()
  })

  //
  // it('clicking on item makes colour active', () => {
  //   wrapper.setProps({
  //     colours: [ '#ffffff' ],
  //     setActiveColour: jest.fn()
  //   })
  //   wrapper
  //     .find('.o-colour-list__item')
  //     .trigger('click')
  //
  //   expect(wrapper.vm.setActiveColour).toHaveBeenCalledWith('#ffffff')
  // })
  //

  //

  //
  // it('having an active colour shows the delete icon for that colour', () => {
  //   wrapper.setProps({
  //     colours: [
  //       '#111111',
  //       '#222222',
  //       '#333333'
  //     ],
  //     activeColour: '#222222'
  //   })
  //   expect(wrapper.findAll('.o-colour-list__item--active .o-colour-list__delete')).toHaveLength(1)
  // })
  //
  // it('clicking on delete icon calls deleteSavedColour function for that colour', () => {
  //   wrapper.setProps({
  //     colours: [
  //       '#111111',
  //       '#222222',
  //       '#333333'
  //     ],
  //     activeColour: '#222222',
  //     deleteSavedColour: jest.fn()
  //   })
  //   wrapper
  //     .find('.o-colour-list__delete')
  //     .trigger('click')
  //
  //   expect(wrapper.vm.deleteSavedColour).toHaveBeenCalledWith('#222222')
  // })
  //
  // it('computed coloursSorted sorts colours by hue', () => {
  //   wrapper.setProps({
  //     colours: [
  //       '#9999ff',
  //       '#ff0000',
  //       '#00ff00',
  //       '#5555ff',
  //       '#ff5555',
  //       '#0000ff',
  //       '#99ff99',
  //       '#ff9999',
  //       '#55ff55'
  //     ]
  //   })
  //   expect(wrapper.vm.coloursSorted).toEqual([
  //     '#ff9999',
  //     '#ff5555',
  //     '#ff0000',
  //     '#99ff99',
  //     '#55ff55',
  //     '#00ff00',
  //     '#9999ff',
  //     '#5555ff',
  //     '#0000ff'
  //   ])
  // })
})
