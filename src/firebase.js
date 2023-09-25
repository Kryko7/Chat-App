// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence);



export { auth, storage, db, app };