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
})
