<template>
  <section>
    <ul>
      <li
        v-for='colour in colours'
        :style='{ backgroundColor: colour }'
        :key='colour'
      >{{colour}}</li>
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
