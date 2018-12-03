<template>
  <section class='t-main__section'>
    <ul class='o-colour-list'>
      <li
        v-for='colour in colours'
        :class="[
          'o-colour-list__item',
          (activeColour === colour) ? 'o-colour-list__item--active' : ''
        ]"
        :style='{ backgroundColor: colour }'
        :key='colour'
        @click='setActiveColour(colour)'
      >
        <span class='o-colour-list__label'>{{GetColourName(colour)}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import GetColourName from '../helpers/GetColourName'

// Use this:
// http://jsfiddle.net/shanfan/ojgp5718/

export default {
  name: 'List',

  props: {
    colours: {
      type: Array,
      default: () => []
    },

    activeColour: {
      type: String,
      default: null
    },

    setActiveColour: {
      type: Function,
      default: () => false
    }
  },

  data: function () {
    return {
      GetColourName: GetColourName
    }
  }
}
</script>
