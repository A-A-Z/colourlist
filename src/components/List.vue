<template>
  <section class='t-main__section'>
    <ul class='o-colour-list'>
      <li
        v-for='colour in coloursSorted'
        :class="[
          'o-colour-list__item',
          isActive(colour) ? 'o-colour-list__item--active' : ''
        ]"
        :style='{ backgroundColor: colour }'
        :key='colour'
        @click='setActiveColour(colour)'
        @keyup.enter="setActiveColour(colour)"
        @keyup.space="setActiveColour(colour)"
        role='button'
        tabindex='0'
        :aria-pressed='isActive(colour)'
      >
        <div
          v-if='isActive(colour) && !isDisabled'
          class='o-colour-list__delete'
          @click.stop='removeColourFromList(colour)'
        >
          <i class="fas fa-trash-alt"></i>
        </div>
        <div class='o-colour-list__label'>{{colourLabel(colour)}}</div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import store from '../store'
import { SET_ACTIVE_COLOUR, REMOVE_COLOUR_FROM_LIST } from '../store/mutation-types'
import { SAVE_STATES } from '../constants'

export default {
  name: 'List',

  store,

  methods: {
    isActive (colour) {
      return this.activeColour === colour
    },

    colourLabel (colour) {
      return this.colourNames[colour] || 'unknown'
    },

    ...mapMutations('colourList', {
      removeColourFromList: REMOVE_COLOUR_FROM_LIST,
      setActiveColour: SET_ACTIVE_COLOUR
    })
  },

  computed: {
    coloursSorted () {
      const colours = this.colours.slice()

      // return value formated for sorting by hue
      const hexToHueVal = (hex) => {
        // get RGB values for hex
        const r = parseInt(hex.substring(1, 3), 16) / 255
        const g = parseInt(hex.substring(3, 5), 16) / 255
        const b = parseInt(hex.substring(5, 7), 16) / 255

        // Getting the Max and Min values for Chroma
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)

        // HSV value
        const chr = max - min
        const val = max
        let hue = 0
        let sat = (val > 0 && chr > 0) ? (chr / val) : 0

        if (val > 0 && chr > 0) {
          if (r === max) {
            hue = 60 * (((g - min) - (b - min)) / chr)
            if (hue < 0) { hue += 360 }
          } else if (g === max) {
            hue = 120 + 60 * (((b - min) - (r - min)) / chr)
          } else if (b === max) {
            hue = 240 + 60 * (((r - min) - (g - min)) / chr)
          }
        }

        return `${hue}-${sat}-${val}`
      }

      // custom sort compare function for comparing HEX values as hue
      const hueCompare = (hexA, hexB) => {
        const hueA = hexToHueVal(hexA)
        const hueB = hexToHueVal(hexB)
        if (hueA < hueB) { return -1 }
        if (hueA > hueB) { return 1 }
        return 0
      }

      return colours.sort(hueCompare)
    },

    isDisabled () {
      switch (this.saveState) {
        case SAVE_STATES.READY:
        case SAVE_STATES.CHANGED:
        case SAVE_STATES.SAVED:
        case SAVE_STATES.ERROR:
          return false

        default:
          return true
      }
    },

    ...mapState('colourList', ['colours', 'activeColour']),

    ...mapState('cloud', ['saveState']),

    ...mapGetters('colourList', ['colourNames'])
  }
}
</script>
