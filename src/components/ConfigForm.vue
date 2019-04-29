<template>
  <section class='o-config'>
    <div class='o-config__field'>
      <input
        :class="[
          'o-config__input',
          'a-checkbox',
          isUk ? 'a-checkbox--checked' : ''
        ]"
        id='config-is-uk'
        type='checkbox'
        :checked='isUk'
        @click="toggleSetting('isUk')"
      />
      <label class='o-config__label' for='config-is-uk'>Queen's English</label>
    </div>
    <div class='o-config__field'>
      <input
        :class="[
          'o-config__input',
          'a-checkbox',
          isLowercase ? 'a-checkbox--checked' : ''
        ]"
        id='config-is-lowercase'
        type='checkbox'
        :checked='isLowercase'
        @click="toggleSetting('isLowercase')"
      />
      <label class='o-config__label' for='config-is-lowercase'>Lowercase</label>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from '../store'
import { SET_SETTING } from '../store/mutation-types'

export default {
  name: 'ConfigForm',

  store,

  methods: {
    toggleSetting (setting) {
      this.setSetting({ [setting]: !this[setting] })
    },

    ...mapMutations('settings', {
      setSetting: SET_SETTING
    })
  },

  computed: {
    ...mapState('settings', ['isUk', 'isLowercase'])
  }
}
</script>
