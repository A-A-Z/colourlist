<template>
  <section class='t-main__section o-new-colour'>

    <div
      :class="[
        'm-colour-preview',
        isNewColourValid ? '' : 'm-colour-preview--invalid'
      ]"
      :style="{
        backgroundColor: isNewColourValid ? newColourInput : '#fff'
      }"
    >
      <div
        v-if='activeColour !== null && activeColour !== newColourInput'
        class='m-colour-preview__active-colour'
        :style="{
          borderTopColor: activeColour
        }"
      ></div>
      <div
        v-if='isNewColourValid'
        class='m-colour-preview__label'
      >
        {{GetColourName(newColourInput)}}
      </div>
      <div v-else class='m-colour-preview__label'>none</div>
    </div>

    <div class='m-colour-field'>
      <input
        class='m-colour-field__input'
        type='text'
        placeholder='#'
        :value='newColourInput'
        :maxlength='7'
        spellcheck='false'
        @input='updateColourInput'
        @keyup.enter="saveColour"
      />
      <button
        :class="[
          'm-colour-field__add',
          isNewColourValid ? '' : 'm-colour-field__add--disabled'
        ]"
        type='button'
        @click='saveColour'
        :disabled='!isNewColourValid'
      />
    </div>

    <sketch-picker
      v-model='pickerColour'
      @input='updatePickerValue'
      :disableAlpha='true'
      :disableFields='true'
      :presetColors='preSetColours'
    />

  </section>
</template>

<script>
import { Sketch } from 'vue-color'
import GetColourName from '../helpers/GetColourName'

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
    activeColour: {
      type: String,
      default: null
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

  data: function () {
    return {
      pickerColour: this.newColourInput,
      preSetColours: [],
      GetColourName: GetColourName
    }
  },

  methods: {
    updateColourInput (e) {
      this.updateNewColour(e.target.value)
    },

    updatePickerValue (value) {
      this.updateNewColour(value.hex)
    }
  },

  watch: {
    newColourInput (newVal) {
      this.pickerColour = newVal
    }
  }
}
</script>
