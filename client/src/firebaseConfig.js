// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {} from 'firebase/storage'
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKCtXQ9QCGmqS18Z7HKNYnCLSQWpi7L74",
  authDomain: "chat-middleware.firebaseapp.com",
  databaseURL: "https://chat-middleware-default-rtdb.firebaseio.com",
  projectId: "chat-middleware",
  storageBucket: "chat-middleware.appspot.com",
  messagingSenderId: "592698830994",
  appId: "1:592698830994:web:2ded0dc1941bc60e54764b",
  measurementId: "G-LFVYL2QQYK"
};
const userType = localStorage.getItem('userType')
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `http://localhost:3000/login/${userType}`,
  // This must be true.
  handleCodeInApp: true,
  // dynamicLinkDomain: 'example.page.link'
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth()
const db = getFirestore();
// const storage = firebase.storage()
// var ui = new firebaseui.auth.AuthUI(app.auth());


// const analytics = getAnalytics(app);
export { firebase, auth, actionCodeSettings, db }
