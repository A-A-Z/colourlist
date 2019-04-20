import VueFirestore from 'vue-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// https://github.com/gdg-tangier/vue-firestore

const config = {
  apiKey: "AIzaSyAGE3A3egzhb2Jd0zb21I_5koh27EF0tYI",
  authDomain: "colourlist-fcc95.firebaseapp.com",
  databaseURL: "https://colourlist-fcc95.firebaseio.com",
  projectId: "colourlist-fcc95",
  storageBucket: "colourlist-fcc95.appspot.com",
  messagingSenderId: "165816101221"
}

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
