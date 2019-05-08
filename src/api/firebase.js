import VueFirestore from 'vue-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from '@/config/firebase.json'

export class db {
  constructor () {
    if (!firebase.apps.length) {
      // start up firebase app (if not already)
      firebase.initializeApp(config)
    }

    const db = firebase.firestore()

    // set projects collection
    this.projects = db.collection('projects')

    // handle anonymous log in
    this.auth = firebase.auth()
  }
}
