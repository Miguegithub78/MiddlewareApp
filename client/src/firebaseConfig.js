// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5wAhueY9lkWtkhtF9DZ6O9Exis6X9rB0",
  authDomain: "middleware-abd0a.firebaseapp.com",
  projectId: "middleware-abd0a",
  storageBucket: "middleware-abd0a.appspot.com",
  messagingSenderId: "253903258363",
  appId: "1:253903258363:web:005517be5c43da0200265e",
  measurementId: "G-ZSYZTH0V60"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth()
// var ui = new firebaseui.auth.AuthUI(app.auth());


// const analytics = getAnalytics(app);
export { firebase, auth } 