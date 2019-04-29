<template>
  <section class='t-main__section o-new-colour'>

    <div
      :class="[
        'm-colour-preview',
        isNewColourValid ? '' : 'm-colour-preview--invalid'
      ]"
      :style="{
        backgroundColor: isNewColourValid ? newColourHex : '#fff'
      }"
    >
      <div
        v-if='activeColour !== null && activeColour !== newColourHex'
        class='m-colour-preview__active-colour'
        :style="{
          borderTopColor: activeColour
        }"
      ></div>
      <div
        v-if='isNewColourValid'
        class='m-colour-preview__label'
      >
        {{GetColourName(newColourHex)}}
      </div>
      <div v-else class='m-colour-preview__label'>none</div>
    </div>

    <div class='m-colour-field'>
      <input
        class='m-colour-field__input'
        type='text'
        placeholder='#'
        :value='newColourHex'
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GetColourName from '../helpers/GetColourName'
import store from '../store'
import { ADD_COLOUR_TO_LIST } from '../store/mutation-types'
import { ON_NEW_COLOUR_INPUT } from '../store/action-types'
import { SAVE_STATES } from '../constants'

export default {
  name: 'NewColour',

  store,

  components: {
    'sketch-picker': Sketch
  },

  data: function () {
    return {
      pickerColour: '#000000',
      preSetColours: [],
      isPickerOpen: false
    }
  },

  created () {
    this.pickerColour = this.newColourHex
  },

  methods: {
    GetColourName,

    updateColourInput (e) {
      this.onNewColourInput(e.target.value)
    },

    updatePickerValue (value) {
      this.onNewColourInput(value.hex)
    },

    togglePicker () {
      this.isPickerOpen = !this.isPickerOpen
    },

    ...mapMutations('colourList', {
      addColour: ADD_COLOUR_TO_LIST
    }),

    ...mapActions('colourList', {
      onNewColourInput: ON_NEW_COLOUR_INPUT
    })
  },

  computed: {
    isDisabled () {
      switch (this.saveState) {
        case SAVE_STATES.READY:
        case SAVE_STATES.CHANGED:
        case SAVE_STATES.SAVED:
        case SAVE_STATES.ERROR:
          return false

        default:
          return true
      }
    },

    ...mapState('colourList', ['activeColour']),

    ...mapState('cloud', ['saveState']),

    ...mapGetters('colourList', ['newColourHex', 'isNewColourValid'])
  },

  watch: {
    newColourHex (newVal) {
      this.pickerColour = newVal
    }
  }
}
</script>
