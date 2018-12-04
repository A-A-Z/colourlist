<template>
  <section class='t-main__section'>
    <ul class='o-colour-list'>
      <li
        v-for='colour in colours'
        :class="[
          'o-colour-list__item',
          isActive(colour) ? 'o-colour-list__item--active' : ''
        ]"
        :style='{ backgroundColor: colour }'
        :key='colour'
        @click='setActiveColour(colour)'
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
        <div class='o-colour-list__label'>{{GetColourName(colour)}}</div>
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
    },

    deleteSavedColour: {
      type: Function,
      default: () => false
    }
  },

  data: function () {
    return {
      GetColourName: GetColourName
    }
  },

  methods: {
    isActive (colour) {
      return this.activeColour === colour
    }
  }
}
</script>
