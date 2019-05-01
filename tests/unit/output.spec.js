import { shallowMount } from '@vue/test-utils'
import Output from '@/components/Output.vue'

describe('Output.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Output, {
      propsData: {
        colourTxt: 'colour',
        isLowercase: true,
        colourNames: {
          '#ffffff': 'White',
          '#000000': 'Black',
          '#ff0000': 'Red',
          '#7c2626': 'Crown of Thorns'
        }
      }
    })
  })

  it('renders Output section', () => {
    expect(wrapper.findAll('.o-output')).toHaveLength(1)
  })

  // it('colour formated for single line', () => {
  //   wrapper.setProps({
  //     colours: [ '#ffffff' ]
  //   })
  //   expect(wrapper.find('.o-output__textarea').element.value)
  //     .toBe('$colour-white: #ffffff;')
  // })
  //
  // it('colour formated for multi-line (with order)', () => {
  //   wrapper.setProps({
  //     colours: [ '#ffffff', '#ff0000', '#000000' ]
  //   })
  //   expect(wrapper.find('.o-output__textarea').element.value)
  //     .toBe('$colour-black: #000000;\n$colour-red: #ff0000;\n$colour-white: #ffffff;')
  // })
  //
  // it('correctly formats multi-word colour names', () => {
  //   wrapper.setProps({
  //     colours: [ '#7c2626' ]
  //   })
  //   expect(wrapper.find('.o-output__textarea').element.value)
  //     .toBe('$colour-crown-of-thorns: #7c2626;')
  // })
  //
  // it('colour HEX in uppercase config', () => {
  //   wrapper.setProps({
  //     colours: [ '#ffffff' ],
  //     isLowercase: false
  //   })
  //   expect(wrapper.find('.o-output__textarea').element.value)
  //     .toBe('$colour-white: #FFFFFF;')
  // })
  //
  // it('colour name with custom colour word', () => {
  //   wrapper.setProps({
  //     colours: [ '#ffffff' ],
  //     colourTxt: 'testme'
  //   })
  //   expect(wrapper.find('.o-output__textarea').element.value)
  //     .toBe('$testme-white: #ffffff;')
  // })
  //
  // it('colour array is blank', () => {
  //   wrapper.setProps({
  //     colours: []
  //   })
  //   expect(wrapper.find('.o-output__textarea').element.value)
  //     .toBe('')
  // })
})
