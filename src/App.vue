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
      :saveState='saveStateTxt'
    />

    <List
      :saveState='saveStateTxt'
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
import { mapState } from 'vuex'
import VueFirestore from 'vue-firestore'
import router from './router'
import FilePanel from './components/FilePanel.vue'
import NewColour from './components/NewColour.vue'
import List from './components/List.vue'
import Output from './components/Output.vue'
import ConfigForm from './components/ConfigForm.vue'
import { auth, ProjectCollection } from './api/firebase.js'
import store from './store'

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

  store,

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
      newColourInput: '#',
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

    // wait till user is logged in
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log('onAuthStateChanged2', user.uid)

        // if ID passed via URL then load
        if (route && route.id) { // TODO regex check
          this.loadProject(route.id)
        } else {
          this.saveState = 2
        }
      } else {
        console.log('log out')
      }
    })
  },

  methods: {
    colourCase (string) { // TODO do something with this (settings store?)
      return this.configIsLowercase ? string.toLowerCase() : string.toUpperCase()
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
    },

    ...mapState(
      'colourList', {
        colours2: state => state.colours
      }
    )
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700,900');
@import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
@import './assets/styles/app';
</style>
