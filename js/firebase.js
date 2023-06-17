import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref as dbRef, onValue, set as dbset, update as dbUpdate, push as dbpush } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged ,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyA4nH4_anE2tXfuKc3SQsecAMfCQEGyjsU",
  authDomain: "kapra-collection.firebaseapp.com",
  databaseURL: "https://kapra-collection-default-rtdb.firebaseio.com",
  projectId: "kapra-collection",
  storageBucket: "kapra-collection.appspot.com",
  messagingSenderId: "1079091462046",
  appId: "1:1079091462046:web:0222b69aa20ed0defa608f",
  measurementId: "G-M5TZZ9CFDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
export { db, dbRef, onValue,dbset, dbUpdate, dbpush, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged ,sendPasswordResetEmail}