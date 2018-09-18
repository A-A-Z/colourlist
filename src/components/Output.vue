<template>
  <section>
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
