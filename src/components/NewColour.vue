<template>
  <section>
    new colour form

    <div class='m-colour-field'>
      <input
        class='m-colour-field__input'
        type='text'
        placeholder='Colour Name'
        :value='newColourInput'
        spellcheck='false'
        @input='updateColourInput'
      />
      <button
        class='m-colour-field__add'
        type='button'
        @click='saveColour'
        :disabled='!isNewColourValid'
      >Add</button>
    </div>

    <sketch-picker
      v-model='pickerColour'
      @input='updatePickerValue'
      :disableAlpha='true'
      :presetColors='preSetColours'
    />

  </section>
</template>

<script>
import { Sketch } from 'vue-color'

const data = {
  pickerColour: '#194d33',
  preSetColours: []
}

export default {
  name: 'NewColour',

  components: {
    'sketch-picker': Sketch
  },

  props: {
    newColourInput: {
      type: String,
      required: true
    },
    isNewColourValid: {
      type: Boolean,
      default: false
    },
    updateNewColour: {
      type: Function,
      default: () => false
    },
    saveColour: {
      type: Function,
      default: () => false
    }
  },

  data: () => {
    return data
  },

  methods: {
    updateColourInput (e) {
      console.log('updateColourInput', e.target.value)
      this.updateNewColour(e.target.value)
    },

    updatePickerValue (value) {
      console.log('picker:', value)
      this.updateNewColour(value.hex)
    }
  }
}
</script>
