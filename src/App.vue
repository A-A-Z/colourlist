<template>
  <main id="app">
    <h1>Colour List</h1>
    <h2>{{colours.hex}}</h2>
    <h3>{{getHexName(colours.hex)}}</h3>
    <sketch-picker v-model='colours' @input='updateValue' />
  </main>
</template>

<script>
import { Sketch } from 'vue-color'
import ntc from './assets/scripts/name-that-color'

const data = {
  colours: '#194d33'
}

export default {
  name: 'app',

  components: {
    ntc,
    'sketch-picker': Sketch
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

    getHexName (hex) {
      console.log(hex)
      if (hex !== undefined) {
        const name = ntc.name(hex)
        return name[1]
      } else {
        return '---'
      }
    }
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
