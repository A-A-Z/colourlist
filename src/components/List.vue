<template>
  <section class='t-main__section'>
    <ul class='o-colour-list'>
      <li
        v-for='colour in colours'
        class='o-colour-list__item'
        :style='{ backgroundColor: colour }'
        :key='colour'
      >
        <span class='o-colour-list__label'>Label Name</span>
        <span class='o-colour-list__hex'>{{colour}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
// Use this:
// http://jsfiddle.net/shanfan/ojgp5718/

export default {
  name: 'List',

  props: {
    colours: {
      type: Array,
      default: () => []
    }
  }
}
</script>
