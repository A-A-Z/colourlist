import ntc from '../assets/scripts/name-that-color'
import Patterns from './Patterns'

ntc.init()

const GetColourName = (hex) => {
  if (hex !== undefined && Patterns.validColour.test(hex)) {
    const name = ntc.name(hex)
    return name[1]
  } else {
    return '---'
  }
}

export default GetColourName
