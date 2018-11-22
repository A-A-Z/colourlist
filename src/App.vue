<template>
  <main id='app'>
    <header class='o-main-heading'>
      <h1 class='o-main-heading__title'>Colour List</h1>
    </header>

    <ConfigForm
      :configIsUk.sync='configIsUk'
      :configIsLowercase.sync='configIsLowercase'
    />

    <section>
      <h2>{{newColourInput}}</h2>
      <h3>{{getHexName(newColourInput)}}</h3>
      <hr>
      <h2>{{newColour.hex}}</h2>
      <h3>{{getHexName(newColour.hex)}}</h3>
    </section>

    <NewColour
      :newColourInput='newColourInput'
      :isNewColourValid='isNewColourValid'
      :updateNewColour='updateNewColour'
      :saveColour='saveColour'
    />

    <List :colours='colours' />

    <Output :colours='colours' />

  </main>
</template>

<script>
import ntc from './assets/scripts/name-that-color'
import NewColour from './components/NewColour.vue'
import List from './components/List.vue'
import Output from './components/Output.vue'
import ConfigForm from './components/ConfigForm.vue'
import Patterns from './helpers/Patterns'

const data = {
  newColour: '#194d33',
  newColourInput: '#',
  colours: ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#000000'],
  preSetColours: [],
  configIsUk: true,
  configIsLowercase: true
}

export default {
  name: 'app',

  components: {
    ntc,
    NewColour,
    List,
    Output,
    ConfigForm
  },

  data: () => {
    return data
  },

  mounted () {
    ntc.init()
  },

  methods: {
    colourCase (string) {
      return this.configIsLowercase ? string.toLowerCase() : string.toUpperCase()
    },

    updateValue (colourVal) {
      // TODO Update this
      console.log('update', colourVal.hex, ntc.name(colourVal.hex))
    },

    updateNewColour (newValue) {
      if (Patterns.inputColour.test(newValue)) {
        // add # suffix if missing
        this.newColourInput = (/^#/.test(newValue)) ? this.colourCase(newValue) : `#${this.colourCase(newValue)}`
      } else {
        // force correct hex inputs
        const oldValue = this.newColourInput
        this.newColourInput = `${this.newColourInput} `
        this.$nextTick(() => {
          this.newColourInput = oldValue
        })
      }
    },

    saveColour () {
      if (this.isNewColourValid) {
        let colours = this.colours.slice()
        let newColour = this.colourCase(this.newColourInput)
        let [match, colourHex] = newColour.match(/([0-9a-f]+)$/)

        // if a 3 letter hex then double the letters
        if (match && colourHex.length === 3) {
          const splitColour = colourHex.split('')
          const doubleLetters = (accumulator, letter) => `${accumulator}${letter}${letter}`
          colourHex = splitColour.reduce(doubleLetters, '')
        }

        newColour = '#' + colourHex

        if (!colours.includes(newColour)) {
          colours.push('#' + colourHex)
          this.colours = colours
        }
        this.newColourInput = ''
      }
    },

    getHexName (hex) {
      if (hex !== undefined) {
        const name = ntc.name(hex)
        return name[1]
      } else {
        return '---'
      }
    }
  },

  computed: {
    colourTxt () {
      return this.configIsUk ? 'colour' : 'color'
    },

    isNewColourValid () {
      return Patterns.validColour.test(this.newColourInput)
    }
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700,900');
@import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
@import './assets/styles/app';
</style>
