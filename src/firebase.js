// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, doc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg5DtvnYWe1M2Liho3Gx7nfTd7eeWCoPo",
  authDomain: "financely-2d485.firebaseapp.com",
  projectId: "financely-2d485",
  storageBucket: "financely-2d485.appspot.com",
  messagingSenderId: "979234256339",
  appId: "1:979234256339:web:9df4ffb93a3c1405e5eb26",
  measurementId: "G-EKY15LM8J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };