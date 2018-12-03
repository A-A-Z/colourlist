import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(App);
  })

  it('renders main', () => {
    expect(wrapper.findAll('main')).toHaveLength(1)
  })

  it('Method colourCase returns lowercase', () => {
    const wrapper = shallowMount(App, {
      propsData: { defaultIsLowercase: true }
    })
    expect(wrapper.vm.colourCase('#AaBbCc')).toEqual('#aabbcc')
  })

  it('Method colourCase returns uppercase', () => {
    const wrapper = shallowMount(App, {
      propsData: { defaultIsLowercase: false }
    })
    expect(wrapper.vm.colourCase('#AaBbCc')).toEqual('#AABBCC')
  })

  it('Method saveColour to save new valid colour', () => {
    wrapper.setData({ colours: [], newColourInput: '#ffffff' })
    wrapper.vm.saveColour()
    expect(wrapper.vm.colours).toEqual(['#ffffff'])
  })

  it('Method saveColour to format valid colour', () => {
    wrapper.setData({ colours: [], newColourInput: '#FFF', configIsLowercase: true })
    wrapper.vm.saveColour()
    expect(wrapper.vm.colours).toEqual(['#ffffff'])
  })

  it('Method saveColour to ignore repeated valid colour', () => {
    wrapper.setData({ colours: ['#ffffff'], newColourInput: '#ffffff' })
    wrapper.vm.saveColour()
    expect(wrapper.vm.colours).toEqual(['#ffffff'])
  })

  it('Method saveColour to ignore invalid colour', () => {
    wrapper.setData({ colours: [], newColourInput: '#fffffp' })
    wrapper.vm.saveColour()
    expect(wrapper.vm.colours).toEqual([])
  })

  it('Method saveColour clears newColourInput', () => {
    wrapper.setData({ colours: [], newColourInput: '#ffffff' })
    wrapper.vm.saveColour()
    expect(wrapper.vm.newColourInput).toEqual('')
  })

  it('Computed colourTxt in Queen\'s english', () => {
    wrapper.setData({ configIsUk: true })
    expect(wrapper.vm.colourTxt).toEqual('colour')
  })

  it('Computed colourTxt in yank english', () => {
    wrapper.setData({ configIsUk: false })
    expect(wrapper.vm.colourTxt).toEqual('color')
  })

  it('Computed isNewColourValid tests "#ffffff" = true', () => {
    wrapper.setData({ newColourInput: '#ffffff' })
    expect(wrapper.vm.isNewColourValid).toEqual(true)
  })

  it('Computed isNewColourValid tests "#fff" = true', () => {
    wrapper.setData({ newColourInput: '#fff' })
    expect(wrapper.vm.isNewColourValid).toEqual(true)
  })

  it('Computed isNewColourValid tests "fff" = true', () => {
    wrapper.setData({ newColourInput: 'fff' })
    expect(wrapper.vm.isNewColourValid).toEqual(true)
  })

  it('Computed isNewColourValid tests "" = false', () => {
    wrapper.setData({ newColourInput: '' })
    expect(wrapper.vm.isNewColourValid).toEqual(false)
  })

  it('Computed isNewColourValid tests "#ff" = false', () => {
    wrapper.setData({ newColourInput: '#ff' })
    expect(wrapper.vm.isNewColourValid).toEqual(false)
  })

  it('Computed isNewColourValid tests "#fffffff" = false', () => {
    wrapper.setData({ newColourInput: '#fffffff' })
    expect(wrapper.vm.isNewColourValid).toEqual(false)
  })

  it('Computed isNewColourValid tests "#fffffp" = false', () => {
    wrapper.setData({ newColourInput: '#fffffp' })
    expect(wrapper.vm.isNewColourValid).toEqual(false)
  })
})
