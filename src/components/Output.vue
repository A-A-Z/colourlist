<template>
  <section class='t-main__section o-output'>
    <textarea></textarea>
  </section>
</template>

<script>
export default {
  name: 'Output',

  props: {
    colours: {
      type: Array,
      default: () => []
    }
  }
}
</script>
