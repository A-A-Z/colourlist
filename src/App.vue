<template>
  <main id="app">
    <h1>Colour List</h1>
    <section>
      <h2>{{newColourInput}}</h2>
      <h3>{{getHexName(newColourInput)}}</h3>

      <input type='text' placeholder='Colour Name' v-model='newColourInput' />
      <button type='button' @click='addNewColour' :disabled='!isNewColourValid'>Add</button>
      <hr>
      <h2>{{newColour.hex}}</h2>
      <h3>{{getHexName(newColour.hex)}}</h3>
      <sketch-picker v-model='newColour' @input='updateValue' />
    </section>
    <List :colours='colours' />
    <Output :colours='colours' />
  </main>
</template>

<script>
import { Sketch } from 'vue-color'
import ntc from './assets/scripts/name-that-color'
import List from './components/List.vue'
import Output from './components/Output.vue'

const data = {
  newColour: '#194d33',
  newColourInput: '#',
  colours: ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#000000']
}

export default {
  name: 'app',

  components: {
    ntc,
    'sketch-picker': Sketch,
    List,
    Output
  },

  data: () => {
    return data
  },

  mounted () {
    ntc.init()
  },

  methods: {
    updateValue (colourVal) {
      console.log('update', colourVal.hex, ntc.name(colourVal.hex))
    },

    addNewColour () {
      if (this.isNewColourValid) {
        let colours = this.colours.slice()
        let newColour = this.newColourInput.toLowerCase()
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
    isNewColourValid () {
      return /^(#|)([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(this.newColourInput)
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700,900");
@import './assets/styles/app';
body {
  font-family: 'Montserrat', sans-serif;
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
