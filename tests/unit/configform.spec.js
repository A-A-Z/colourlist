import { shallowMount } from '@vue/test-utils'
import ConfigForm from '@/components/ConfigForm.vue'

describe('ConfigForm.vue', () => {
  it('renders ConfigForm section', () => {
    const wrapper = shallowMount(ConfigForm, {
      propsData: {
        configIsUk: true,
        configIsLowercase: true
      }
    })
    expect(wrapper.findAll('.o-config')).toHaveLength(1)
  })
})
