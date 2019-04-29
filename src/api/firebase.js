import VueFirestore from 'vue-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from '../config/firebase.json'

firebase.initializeApp(config)

const db = firebase.firestore()

const ProjectCollection = db.collection('projects')

// handle anonymous log in
const auth = firebase.auth()
auth.signInAnonymously()
  .catch(error => {
    console.error('signInAnonymously error', error)
  })
// TODO add more rules
// https://firebase.google.com/docs/firestore/security/get-started?authuser=0

export {
  db,
  auth,
  ProjectCollection
}
