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
        :disabled='saveDisabled'
        @click='onSave'
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
import { mapState, mapActions } from 'vuex'
import store from '@/store'
import { CREATE, ON_TITLE_CHANGE, UPDATE } from '@/store/action-types'
// import { SAVE_STATES } from '@/constants'
import Throbber from './views/Throbber'

export default {
  name: 'FilePanel',

  store,

  components: {
    Throbber
  },

  methods: {
    onTitleInput (e) {
      this.onTitleChange(e.target.value)
    },

    onSave () {
      if (this.id === null) {
        // no id, so create new project
        this.createProject()
      } else {
        // has id, update project
        this.updateProject()
      }
    },

    ...mapActions('project', {
      onTitleChange: ON_TITLE_CHANGE
    }),

    ...mapActions('cloud', {
      createProject: CREATE,
      updateProject: UPDATE
    })
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

    ...mapState('cloud', ['saveState']),

    ...mapState('project', ['id', 'title'])
  }
}
</script>
