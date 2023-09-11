// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import  { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC22FjT577T4r41HiINJsFT5bi-dgGkgbo",
  authDomain: "babble-ac34d.firebaseapp.com",
  projectId: "babble-ac34d",
  storageBucket: "babble-ac34d.appspot.com",
  messagingSenderId: "777737466729",
  appId: "1:777737466729:web:146bb31ffbc6ef855383f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);