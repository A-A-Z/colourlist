import { shallowMount } from '@vue/test-utils'
import FilePanel from '@/components/FilePanel.vue'

describe('FilePanel.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FilePanel, {
      // propsData: {
      //   colourNames: {
      //     '#ff0000': 'Red',
      //   }
      // }
    })
  })

  it('renders File Panel section', () => {
    expect(wrapper.findAll('.o-file')).toHaveLength(1)
  })

  it('shows project name value in input', () => {
    wrapper.setProps({ title: 'Test Title' })
    expect(wrapper.find('.o-file__title').element.value).toBe('Test Title')
  })

  it('saveState "mounted" disables input', () => {
    wrapper.setProps({ saveState: 'mounted' })
    expect(wrapper.find('.o-file__title').attributes('disabled','disabled')).toBeTruthy()
  })

  it('saveState "loading" disables input', () => {
    wrapper.setProps({ saveState: 'loading' })
    expect(wrapper.find('.o-file__title').attributes('disabled','disabled')).toBeTruthy()
  })

  it('saveState "ready" enables input', () => {
    wrapper.setProps({ saveState: 'ready' })
    expect(wrapper.find('.o-file__title').attributes('disabled','disabled')).toBeFalsy()
  })

  it('saveState "changed" enables input', () => {
    wrapper.setProps({ saveState: 'changed' })
    expect(wrapper.find('.o-file__title').attributes('disabled','disabled')).toBeFalsy()
  })

  it('saveState "saving" disables input', () => {
    wrapper.setProps({ saveState: 'saving' })
    expect(wrapper.find('.o-file__title').attributes('disabled','disabled')).toBeTruthy()
  })

  it('saveState "saved" enables input', () => {
    wrapper.setProps({ saveState: 'saved' })
    expect(wrapper.find('.o-file__title').attributes('disabled','disabled')).toBeFalsy()
  })

  it('saveState "mounted" disables save button', () => {
    wrapper.setProps({ saveState: 'mounted' })
    expect(wrapper.find('.o-file__save-btn').attributes('disabled','disabled')).toBeTruthy()
  })

  it('saveState "loading" disables save button', () => {
    wrapper.setProps({ saveState: 'loading' })
    expect(wrapper.find('.o-file__save-btn').attributes('disabled','disabled')).toBeTruthy()
  })

  it('saveState "ready" disables save button', () => {
    wrapper.setProps({ saveState: 'ready' })
    expect(wrapper.find('.o-file__save-btn').attributes('disabled','disabled')).toBeTruthy()
  })

  it('saveState "changed" disables save button', () => {
    wrapper.setProps({ saveState: 'changed' })
    expect(wrapper.find('.o-file__save-btn').attributes('disabled','disabled')).toBeFalsy()
  })

  it('saveState "saving" disables save button', () => {
    wrapper.setProps({ saveState: 'saving' })
    expect(wrapper.find('.o-file__save-btn').attributes('disabled','disabled')).toBeTruthy()
  })

  it('saveState "saved" disables save button', () => {
    wrapper.setProps({ saveState: 'saved' })
    expect(wrapper.find('.o-file__save-btn').attributes('disabled','disabled')).toBeTruthy()
  })

  it('input calls updateTitle()', () => {
    wrapper.setProps({
      saveState: 'ready',
      updateTitle: jest.fn()
    })

    wrapper
      .find('.o-file__title')
      .trigger('input')

    expect(wrapper.vm.updateTitle).toHaveBeenCalledTimes(1)
  })

  it('clicking save button calls save()', () => {
    wrapper.setProps({
      saveState: 'changed',
      save: jest.fn()
    })

    wrapper
      .find('.o-file__save-btn')
      .trigger('click')

    expect(wrapper.vm.save).toHaveBeenCalledTimes(1)
  })
})
