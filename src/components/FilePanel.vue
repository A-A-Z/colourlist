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
        :class='`o-file__save a-save-btn a-save-btn--${saveState}`'
        @click='save'
        :disabled='saveDisabled'
      >
        <span>{{saveLabel}}</span>
        <Throbber
          :state='throbberState'
          :isActive='throbberIsActive'
        />
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
import Throbber from './views/Throbber'

export default {
  name: 'FilePanel',

  store,

  components: {
    Throbber
  },

  props: {
    // title: {
    //   type: String,
    //   default: 'Untitled Project'
    // },
    // saveState: {
    //   type: String,
    //   default: 'mounted'
    // },
    updateTitle: {
      type: Function,
      default: (e) => { console.warn('[default] updateTitle called', e) }
    },
    save: {
      type: Function,
      default: (e) => { console.warn('[default] save called') }
    }
  },

  methods: {
    onTitleInput (e) {
      // this.updateTitle(e.target.value)
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
    },

    saveDisabled () { // returns true/false based on saveState
      switch (this.saveState) {
        case ('changed'):
          return false

        default:
          return true
      }
    },

    saveLabel () {
      switch (this.saveState) {
        case ('mounted'):
          return '---'

        case ('loading'):
          return 'Loading'

        case ('ready'):
        case ('changed'):
          return 'Save'

        case ('saving'):
          return 'Saving'

        case ('saved'):
          return 'Saved'

        default:
          return 'Error'
      }
    },

    throbberState () {
      switch (this.saveState) {
        case 'loading':
          return 'download'

        case 'changed':
        case 'saving':
          return 'upload'

        case 'error':
          return 'error'

        default:
          return 'default'
      }
    },

    throbberIsActive () {
      switch (this.saveState) {
        case 'loading':
        case 'saving':
          return true

        default:
          return false
      }
    },

    ...mapState('cloud', ['saveState', 'title'])
  }
}
</script>
