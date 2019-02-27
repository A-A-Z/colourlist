<template>
  <main id='app' class='t-main'>
    <header class='t-main__header o-main-heading'>
      <h1 class='o-main-heading__title'>
        <span>Colour</span><span>List</span>
      </h1>
    </header>

    <FilePanel
      :title='project.name'
      :saveState='saveStateTxt'
      :updateTitle='updateTitle'
      :save='saveProject'
    />

    <NewColour
      :newColourInput='newColourInput'
      :isNewColourValid='isNewColourValid'
      :activeColour='activeColour'
      :updateNewColour='updateNewColour'
      :saveColour='saveColour'
    />

    <List
      :colours='colours'
      :colourNames='colourNames'
      :activeColour='activeColour'
      :setActiveColour='setActiveColour'
      :deleteSavedColour='deleteSavedColour'
    />

    <Output
      :colours='colours'
      :colourNames='colourNames'
      :colourTxt='colourTxt'
      :isLowercase='configIsLowercase'
    />

    <footer class='t-main__footer'>
      <ConfigForm
        :configIsUk.sync='configIsUk'
        :configIsLowercase.sync='configIsLowercase'
      />
    </footer>

  </main>
</template>

<script>
import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import router from './router'
import FilePanel from './components/FilePanel.vue'
import NewColour from './components/NewColour.vue'
import List from './components/List.vue'
import Output from './components/Output.vue'
import ConfigForm from './components/ConfigForm.vue'
import GetColourName from './helpers/GetColourName'
import Patterns from './helpers/Patterns'
import { ProjectCollection } from './api/firebase.js'

Vue.use(VueFirestore)

/* TODO list
--------------
* Save state
* Mobile sopport
* Assign colours
* Import from text
* language packs
*/

export default {
  name: 'app',

  components: {
    FilePanel,
    NewColour,
    List,
    Output,
    ConfigForm
  },

  props: {
    // config defaults
    defaultIsUk: {
      type: Boolean,
      default: true
    },
    defaultIsLowercase: {
      type: Boolean,
      default: true
    }
  },

  data: function () {
    return {
      newColour: '#194d33',
      newColourInput: '#',
      // colours: [
      //   '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#000000', '#7c2626', '#265c7c', '#e9c524',
      //   '#123120', '#123124',
      //   '#321321', '#321322', '#321323'
      // ],
      colours: [],
      activeColour: null,
      configIsUk: this.defaultIsUk,
      configIsLowercase: this.defaultIsLowercase,
      saveState: 0,
      project: {
        name: '',
        list: []
      },
      projectKey: null,
      tempProjectId: ''
    }
  },

  created () {
    const route = this.$route.params
    // if ID passed via URL then load
    if (route && route.id) { // TODO regex check
      this.loadProject(route.id)
    } else {
      this.saveState = 2
    }
  },

  methods: {
    colourCase (string) {
      return this.configIsLowercase ? string.toLowerCase() : string.toUpperCase()
    },

    updateNewColour (newValue) {
      if (Patterns.inputColour.test(newValue)) {
        // add # suffix if missing
        this.newColourInput = (/^#/.test(newValue)) ? this.colourCase(newValue) : `#${this.colourCase(newValue)}`
      } else {
        // force correct hex inputs
        const oldValue = this.newColourInput
        this.newColourInput = `${this.newColourInput} `
        this.$nextTick(() => {
          this.newColourInput = oldValue
        })
      }
    },

    saveColour () {
      if (this.isNewColourValid) {
        let colours = this.colours.slice()
        let newColour = this.colourCase(this.newColourInput)
        let [match, colourHex] = newColour.match(Patterns.colourChars)

        // if a 3 letter hex then double the letters
        if (match && colourHex.length === 3) {
          const splitColour = colourHex.split('')
          const doubleLetters = (accumulator, letter) => `${accumulator}${letter}${letter}`
          colourHex = splitColour.reduce(doubleLetters, '')
        }

        newColour = '#' + colourHex

        if (!colours.includes(newColour)) {
          if (this.activeColour === null) { // no active, so new colour
            colours.push('#' + colourHex)
          } else { // active, so update current
            const index = colours.indexOf(this.activeColour)
            colours[index] = '#' + colourHex
            this.activeColour = null
          }
          this.colours = colours
        }
        this.newColourInput = ''
      }
    },

    setActiveColour (colour) {
      if (this.activeColour === colour) {
        this.activeColour = null
        this.newColourInput = '#'
      } else {
        this.activeColour = colour
        this.newColourInput = colour
      }
    },

    deleteSavedColour (colour) {
      // filter out the passed colour
      this.colours = this.colours.filter(entry => entry !== colour)

      // if colour is also the active colour then clear that
      if (this.activeColour === colour) {
        this.activeColour = null
        this.newColourInput = '#'
      }
    },

    updateTitle (value) {
      let project = this.project
      project.name = value
      this.project = project
      this.saveState = 3
    },

    loadProject (projectId) {
      this.saveState = 1 // loading
      this.$binding('data', ProjectCollection.where('id', '==', projectId))
        .then((data) => {
          if (data.length === 1) {
            this.saveState = 2 // ready
            this.project = data[0]
            this.colours = (this.project.list || [])
            this.projectKey = data[0]['.key']
          } else {
            this.saveState = 6 // error
            console.error('Not found')
          }
        }).catch(err => {
          this.saveState = 6 // error
          console.error(err)
        })
    },

    saveProject: async function () {
      this.saveState = 4 // saving
      this.project.list = this.colours
      if (this.projectKey === null) { // new projct, add new
        const newID = await this.getNewProjectId()
        this.project.id = newID
        ProjectCollection.add(this.project)
          .then((data) => {
            this.projectKey = data.id
            this.saveState = 5 // saved
            router.push({ path: `/${newID}` })
          })
      } else { // update project
        delete this.project['.key']
        ProjectCollection.doc(this.projectKey).update(this.project)
          .then((data) => {
            this.saveState = 5 // saved
          })
      }
    },

    getNewProjectId: async function () {
      // creat a string of random chars of X length
      const randId = length => Math.random().toString(36).substr(2, length)

      // set new id
      const newId = randId(5)

      return new Promise(resolve => {
        this.$binding('data', ProjectCollection.where('id', '==', newId))
          .then((data) => {
            console.log('data', data.length, data) // TODO: handle match
            resolve(newId)
          })
          .catch((...error) => {
            console.error('Error', error) // TODO: handle error better
          })
      })
    }
  },

  computed: {
    colourTxt () {
      return this.configIsUk ? 'colour' : 'color'
    },

    isNewColourValid () {
      return Patterns.validColour.test(this.newColourInput)
    },

    colourNames () {
      let names = {}
      let nameCount = {}
      let firsts = {}

      // create names list from this.colours
      // (lets try to do this in one loop)
      for (const colour of this.colours) {
        let name = GetColourName(colour)
        nameCount[name] = (nameCount[name] + 1) || 1

        // checking for duplicates
        switch (nameCount[name]) {
          case 1: // new colour name
            names[colour] = name
            firsts[name] = colour
            break

          case 2: // name used once before
            names[firsts[name]] = `${name} 1` // rename the first
            /* falls through */

          default: // name used more then once
            names[colour] = `${name} ${nameCount[name]}`
        }
      }

      return names
    },

    saveStateTxt () {
      const txt = [
        'mounted',
        'loading',
        'ready',
        'changed',
        'saving',
        'saved',
        'error'
      ]
      return txt[this.saveState]
    }
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700,900');
@import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
@import './assets/styles/app';
</style>
