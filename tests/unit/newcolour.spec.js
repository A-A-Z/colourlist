import { shallowMount } from '@vue/test-utils'
import NewColour from '@/components/NewColour.vue'

describe('NewColour.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(NewColour, {
      propsData: {
        newColourInput: '#'
      }
    })
  })

  it('renders NewColour section', () => {
    expect(wrapper.findAll('.o-new-colour')).toHaveLength(1)
  })

  // it('shows newColourInput value in input', () => {
  //   wrapper.setProps({ newColourInput: '#ffffff' })
  //   expect(wrapper.find('.m-colour-field__input').element.value).toBe('#ffffff')
  // })
  //
  // it('input calls updateNewColour', () => {
  //   wrapper.setProps({
  //     updateNewColour: jest.fn()
  //   })
  //
  //   wrapper
  //     .find('.m-colour-field__input')
  //     .trigger('input')
  //
  //   expect(wrapper.vm.updateNewColour).toHaveBeenCalledTimes(1)
  // })
  //
  // it('enter keydown calls saveColour', () => {
  //   wrapper.setProps({
  //     newColourInput: '#ffffff',
  //     isNewColourValid: true,
  //     saveColour: jest.fn()
  //   })
  //
  //   wrapper
  //     .find('.m-colour-field__input')
  //     .trigger('keyup.enter')
  //
  //   expect(wrapper.vm.saveColour).toHaveBeenCalledTimes(1)
  // })
  //
  // it('add button enabled if colour is valid', () => {
  //   wrapper.setProps({ isNewColourValid: true })
  //   expect(wrapper.find('.m-colour-field__add').attributes('disabled','disabled')).toBeFalsy()
  // })
  //
  // it('add button disabled if colour is invalid', () => {
  //   wrapper.setProps({ isNewColourValid: false })
  //   expect(wrapper.find('.m-colour-field__add').attributes('disabled','disabled')).toBeTruthy()
  // })
  //
  // it('clicking add button calls saveColour', () => {
  //   wrapper.setProps({
  //     newColourInput: '#ffffff',
  //     isNewColourValid: true,
  //     saveColour: jest.fn()
  //   })
  //
  //   wrapper
  //     .find('.m-colour-field__add')
  //     .trigger('click')
  //
  //   expect(wrapper.vm.saveColour).toHaveBeenCalledTimes(1)
  // })
})
