import GetColourName from '@/helpers/GetColourName.js'

describe('GetColourName.js', () => {
  it('Hex value "#ffffff" returns "White"', () => {
    expect(GetColourName('#ffffff')).toEqual('White')
  })

  it('Hex value "#F00" returns "Red"', () => {
    expect(GetColourName('#F00')).toEqual('Red')
  })

  it('Hex value undefined returns "---"', () => {
    expect(GetColourName(undefined)).toEqual('---')
  })

  it('Hex value "#ff" returns "---"', () => {
    expect(GetColourName('#ff')).toEqual('---')
  })
})
