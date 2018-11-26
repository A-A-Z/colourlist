import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders something', () => {
    const wrapper = shallowMount(App, {
      propsData: { }
    })
    expect(wrapper.findAll('main')).toHaveLength(1)
  })
})
