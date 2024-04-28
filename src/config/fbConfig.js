import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyD4lSZBSxL9YyEkRWM5fEGgzTWOW44wxAE",
    authDomain: "nssvec-bd9df.firebaseapp.com",
    projectId: "nssvec-bd9df",
    storageBucket: "nssvec-bd9df.appspot.com",
    messagingSenderId: "287406445456",
    appId: "1:287406445456:web:3ed2e62e5c837a94e51915",
    measurementId: "G-GKETKK6ZGK"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const storage = firebase.storage();
const functions = firebase.functions();

export {
    storage,
    functions,
    firebase as default
}
