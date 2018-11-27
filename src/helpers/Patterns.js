
const Patterns = {
  // must be hex and 3 or 6 chars long
  'validColour': new RegExp(/^(#|)([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
  // must be hex and not more then 6 chars long
  'inputColour': new RegExp(/^(#|)([0-9a-fA-F]{0,6})$/),
  // must be hex without #
  'colourChars': new RegExp(/([0-9a-fA-F]+)$/)
}

export default Patterns
