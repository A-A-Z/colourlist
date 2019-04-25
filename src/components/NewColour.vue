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
        :value='newColourInput2'
        :maxlength='7'
        spellcheck='false'
        :disabled='isDisabled'
        @input='updateColourInput'
        @keyup.enter="addColour"
      />
      <button
        :class="[
          'm-colour-field__add',
          isNewColourValid ? '' : 'm-colour-field__add--disabled'
        ]"
        type='button'
        @click='addColour'
        :disabled='!isNewColourValid || isDisabled'
        aria-label='Add colour to list'
      />
    </div>

    <div
      :class="[
        'm-colour-picker',
        isPickerOpen ? 'm-colour-picker--open' : ''
      ]"
    >
      <button
        class='m-colour-picker__toggle'
        @click='togglePicker'
        :aria-pressed='togglePicker'
        aria-label='Toggle colour picker'
      >
        <i class="fas fa-palette"></i>
      </button>
      <div class='m-colour-picker__picker'>
        <sketch-picker
          v-model='pickerColour'
          @input='updatePickerValue'
          :disableAlpha='true'
          :disableFields='true'
          :presetColors='preSetColours'
        />
      </div>
    </div>

  </section>
</template>

<script>
import { Sketch } from 'vue-color'
import { mapState, mapMutations } from 'vuex'
import GetColourName from '../helpers/GetColourName'
import store from '../store'
import {
  ADD_COLOUR_TO_LIST,
  NEW_COLOUR_CHANGE
} from '../store/mutation-types'

export default {
  name: 'NewColour',

  store,

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
    saveState: {
      type: String,
      default: 'ready'
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
      GetColourName: GetColourName,
      isPickerOpen: false
    }
  },

  methods: {
    updateColourInput (e) {
      this.updateNewColour(e.target.value)
      this.newColourChange2(e.target.value)
    },

    updatePickerValue (value) {
      this.updateNewColour(value.hex)
    },

    togglePicker () {
      this.isPickerOpen = !this.isPickerOpen
    },

    ...mapMutations('colourList', {
      newColourChange2: NEW_COLOUR_CHANGE, // TODO rename
      addColour: ADD_COLOUR_TO_LIST
    })
  },

  computed: {
    isDisabled () {
      switch (this.saveState) {
        case 'ready':
        case 'changed':
        case 'saved':
        case 'error':
          return false

        default:
          return true
      }
    },

    ...mapState(
      'colourList', {
        newColourInput2: state => state.newColourInput // TODO rename
      }
    )
  },

  watch: {
    newColourInput (newVal) {
      this.pickerColour = newVal
    }
  }
}
</script>
