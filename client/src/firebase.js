// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: proces.env.EACT_APP_FIREBASE_APIKEY,
  authDomain: proces.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: proces.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: proces.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: proces.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: proces.env.REACT_APP_FIREBASE_APPID,
  measurementId: proces.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
