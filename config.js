// firebase config key setup
import {getDatabase} from 'firebase/database'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAROYB_7PjzzSt5QYsYKpnFvDKUSjWbgk",
  authDomain: "pgpnextlaundry2-2d617.firebaseapp.com",
  databaseURL: "https://pgpnextlaundry2-2d617-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pgpnextlaundry2-2d617",
  storageBucket: "pgpnextlaundry2-2d617.appspot.com",
  messagingSenderId: "57073822939",
  appId: "1:57073822939:web:3607ec4c7171927334b0fe"
};


if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

const app =  firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};
export {firebase};
export const authentication = getAuth(app);