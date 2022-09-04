// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey:"AIzaSyACaBcVX56lG44WAG8B89MfiaDAvo9jQTE",
  authDomain: "hack-4fbb4.firebaseapp.com",
  projectId: "hack-4fbb4",
  storageBucket: "hack-4fbb4.appspot.com",
  messagingSenderId: "795235024690",
  appId: "1:795235024690:web:57d1b5d8edb6272203612b",
  measurementId: "G-6ENT0YX866"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);

export default app;