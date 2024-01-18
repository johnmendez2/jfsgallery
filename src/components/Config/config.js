import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBthIWYTtxNGamZSIOqHD4xqTvp9kN8QFM",
  authDomain: "galleryjfs-ebd5b.firebaseapp.com",
  projectId: "galleryjfs-ebd5b",
  storageBucket: "galleryjfs-ebd5b.appspot.com",
  messagingSenderId: "951111119750",
  appId: "1:951111119750:web:a17543f6aa0cc138727207",
  measurementId: "G-RCN9BH6BQ7"
};


// Use this to initialize the firebase App
firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const fs = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {auth, fs, storage}
