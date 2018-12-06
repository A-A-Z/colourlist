import { shallowMount } from '@vue/test-utils'
import List from '@/components/List.vue'

describe('List.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(List)
  })

  it('renders List section', () => {
    expect(wrapper.findAll('.o-colour-list')).toHaveLength(1)
  })

  it('renders list with three items', () => {
    wrapper.setProps({
      colours: [
        '#111111',
        '#222222',
        '#333333'
      ]
    })
    expect(wrapper.findAll('.o-colour-list__item')).toHaveLength(3)
  })

  it('renders list with zero items', () => {
    wrapper.setProps({
      colours: []
    })
    expect(wrapper.findAll('.o-colour-list__item')).toHaveLength(0)
  })

  it('renders colour label', () => {
    wrapper.setProps({
      colours: ['#ff0000']
    })
    expect(wrapper.find('.o-colour-list__label').text()).toBe('Red')
  })

  it('clicking on item makes colour active', () => {
    wrapper.setProps({
      colours: [ '#ffffff' ],
      setActiveColour: jest.fn()
    })
    wrapper
      .find('.o-colour-list__item')
      .trigger('click')

    expect(wrapper.vm.setActiveColour).toHaveBeenCalledWith('#ffffff')
  })

  it('hitting enter on item makes colour active', () => {
    wrapper.setProps({
      colours: [ '#ffffff' ],
      setActiveColour: jest.fn()
    })
    wrapper
      .find('.o-colour-list__item')
      .trigger('keyup.enter')

    expect(wrapper.vm.setActiveColour).toHaveBeenCalledWith('#ffffff')
  })

  it('hitting space on item makes colour active', () => {
    wrapper.setProps({
      colours: [ '#ffffff' ],
      setActiveColour: jest.fn()
    })
    wrapper
      .find('.o-colour-list__item')
      .trigger('keyup.space')

    expect(wrapper.vm.setActiveColour).toHaveBeenCalledWith('#ffffff')
  })

  it('having an active colour renders that colour as active', () => {
    wrapper.setProps({
      colours: [
        '#111111',
        '#222222',
        '#333333'
      ],
      activeColour: '#222222'
    })
    expect(wrapper.findAll('.o-colour-list__item--active')).toHaveLength(1)
  })

  it('having an active colour shows the delete icon for that colour', () => {
    wrapper.setProps({
      colours: [
        '#111111',
        '#222222',
        '#333333'
      ],
      activeColour: '#222222'
    })
    expect(wrapper.findAll('.o-colour-list__item--active .o-colour-list__delete')).toHaveLength(1)
  })

  it('clicking on delete icon calls deleteSavedColour function for that colour', () => {
    wrapper.setProps({
      colours: [
        '#111111',
        '#222222',
        '#333333'
      ],
      activeColour: '#222222',
      deleteSavedColour: jest.fn()
    })
    wrapper
      .find('.o-colour-list__delete')
      .trigger('click')

    expect(wrapper.vm.deleteSavedColour).toHaveBeenCalledWith('#222222')
  })

  it('computed coloursSorted sorts colours by hue', () => {
    wrapper.setProps({
      colours: [
        '#9999ff',
        '#ff0000',
        '#00ff00',
        '#5555ff',
        '#ff5555',
        '#0000ff',
        '#99ff99',
        '#ff9999',
        '#55ff55'
      ]
    })
    expect(wrapper.vm.coloursSorted).toEqual([
      '#ff9999',
      '#ff5555',
      '#ff0000',
      '#99ff99',
      '#55ff55',
      '#00ff00',
      '#9999ff',
      '#5555ff',
      '#0000ff'
    ])
  })
})
