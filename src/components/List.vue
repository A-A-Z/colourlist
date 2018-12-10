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
          v-if='isActive(colour)'
          class='o-colour-list__delete'
          @click.stop='deleteSavedColour(colour)'
        >
          <i class="fas fa-trash-alt"></i>
        </div>
        <div class='o-colour-list__label'>{{colourLabel(colour)}}</div>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  name: 'List',

  props: {
    colours: {
      type: Array,
      default: () => []
    },
    colourNames: {
      type: Object,
      default: () => ({})
    },
    activeColour: {
      type: String,
      default: null
    },
    setActiveColour: {
      type: Function,
      default: () => false
    },
    deleteSavedColour: {
      type: Function,
      default: () => false
    }
  },

  methods: {
    isActive (colour) {
      return this.activeColour === colour
    },

    colourLabel (colour) {
      return this.colourNames[colour] || 'unknown'
    }
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
    }
  }
}
</script>
