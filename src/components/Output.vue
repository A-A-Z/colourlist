<template>
  <section class='t-main__section o-output'>
    <textarea
      class='o-output__textarea'
      v-model='textareaTxt'
      :readonly='true'
    />
  </section>
</template>

<script>
import GetColourName from '../helpers/GetColourName'

export default {
  name: 'Output',

  props: {
    colours: {
      type: Array,
      default: () => []
    },
    colourTxt: {
      type: String,
      required: true
    },
    isLowercase: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    colourCase (string) {
      return this.configIsLowercase ? string.toLowerCase() : string.toUpperCase()
    }
  },

  computed: {
    textareaTxt () {
      // set the correct caing for the HEX value
      const colourCase = (string) => this.isLowercase ? string.toLowerCase() : string.toUpperCase()

      // formats the colour name for the SCSS var
      const formatColourTxt = (colour) => GetColourName(colour).replace(/ /g, '-').toLowerCase()

      // format the line of SCSS code
      const scssLine = (colour) => `$${this.colourTxt}-${formatColourTxt(colour)}: ${colourCase(colour)};`

      // convert colours array into an array of SCSS lines
      const scssLines = this.colours.map(scssLine)

      // sort array, convert to string with line breaks and return
      return scssLines.sort().join('\n')
    }
  }
}
</script>
