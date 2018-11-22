<template>
  <section class='o-config'>
    <div class='o-config__field'>
      <input
        :class="[
          'o-config__input',
          'a-checkbox',
          configIsUk ? 'a-checkbox--checked' : ''
        ]"
        id='config-is-uk'
        type='checkbox'
        :checked='configIsUk'
        @click='onChangeIsUk()'
      />
      <label class='o-config__label' for='config-is-uk'>Queen's English</label>
    </div>
    <div class='o-config__field'>
      <input
        :class="[
          'o-config__input',
          'a-checkbox',
          configIsLowercase ? 'a-checkbox--checked' : ''
        ]"
        id='config-is-lowercase'
        type='checkbox'
        :checked='configIsLowercase'
        @click='onChangeIsLowercase()'
      />
      <label class='o-config__label' for='config-is-lowercase'>Lowercase</label>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ConfigForm',

  props: {
    configIsUk: {
      type: Boolean,
      required: true
    },
    configIsLowercase: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    onChangeIsUk () {
      this.$emit('update:configIsUk', !this.configIsUk)
    },

    onChangeIsLowercase () {
      this.$emit('update:configIsLowercase', !this.configIsLowercase)
    }
  }
}
</script>
