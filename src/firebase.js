// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDJeX9LvHEEUSmgnpztLmXLKjysvwzE-1E",
  authDomain: "ecommerce-6693c.firebaseapp.com",
  projectId: "ecommerce-6693c",
  storageBucket: "ecommerce-6693c.appspot.com",
  messagingSenderId: "465160284470",
  appId: "1:465160284470:web:3f445410d5d82113316b97",
  measurementId: "G-076ML29TSK",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const firebase = getFirestore();

const colref = collection(firebase, "products");

getDocs(colref).then((snapshot) => {});
export default firebase;
