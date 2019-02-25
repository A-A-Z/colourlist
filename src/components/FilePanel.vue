<template>
  <section class='t-main__file'>

    <div class='o-file'>
      <input
        class='o-file__title'
        type="text"
        :value='title'
        placeholder='Project title'
        :disabled='titleDisabled'
        @input="onTitleInput"
      />
      <button
        class='o-file__save-btn'
      >Save ({{saveState}})</button>
    </div>

  </section>
</template>

<script>
export default {
  name: 'FilePanel',

  props: {
    title: {
      type: String,
      default: 'Untitled Project'
    },
    saveState: {
      type: String,
      default: 'mounted'
    },
    updateTitle: {
      type: Function,
      default: (e) => { console.warn('[default] updateTitle called', e) }
    }
  },

  methods: {
    onTitleInput (e) {
      this.updateTitle(e.target.value)
    }
  },

  computed: {
    titleDisabled () { // returns true/false based on saveState
      switch (this.saveState) {
        case ('mounted'):
        case ('loading'):
        case ('saving'):
          return true

        default:
          return false
      }
    }
  }
}
</script>
