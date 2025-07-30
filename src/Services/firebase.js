// src/Services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDzKe3EBj0dyeFRbgBo6CWr-u2R3565mPI",
  authDomain: "dashboard-app-6906b.firebaseapp.com",
  databaseURL: "https://dashboard-app-6906b-default-rtdb.firebaseio.com",
  projectId: "dashboard-app-6906b",
  storageBucket: "dashboard-app-6906b.appspot.com", 
  messagingSenderId: "135477355346",
  appId: "1:135477355346:web:7221d155d64fa5650c508b",
  measurementId: "G-XDLSGJYLM9"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);          
export const db = getFirestore(app);       
export const rtdb = getDatabase(app);      
