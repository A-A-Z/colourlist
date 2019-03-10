<template>
  <i :class="[
    'a-throbber',
    { 'a-throbber--active': isActive },
    'fas',
    stateIcon
  ]" />
</template>

<script>
export default {
  name: 'Throbber',

  props: {
    state: {
      type: String,
      default: 'default',
      validator: (value) => {
        return [
          'default',
          'download',
          'upload',
          'error'
        ].indexOf(value) !== -1
      }
    },

    isActive: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    stateIcon () {
      switch (this.state) {
        case 'upload':
          return 'fa-cloud-upload-alt'

        case 'download':
          return 'fa-cloud-download-alt'

        default:
          return 'fa-cloud'
      }
    }
  }
}
</script>
