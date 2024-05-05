// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP92o3kCt_4NWYzS3tCqzxO2xLQE7aTK8",
  authDomain: "spradapp.firebaseapp.com",
  projectId: "spradapp",
  storageBucket: "spradapp.appspot.com",
  messagingSenderId: "888687427938",
  appId: "1:888687427938:web:8c59360521248967846c3b",
  measurementId: "G-P7SGHQHRJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)