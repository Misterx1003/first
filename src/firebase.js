// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ТВОЯ_API_KEY",
  authDomain: "ТВІЙ_ПРОЕКТ.firebaseapp.com",
  projectId: "ТВІЙ_ПРОЕКТ",
  storageBucket: "ТВІЙ_ПРОЕКТ.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);