// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfaHTqNQcbxFt-JAKnR7qiAbqhYsMP7Oo",
  authDomain: "woo-multi-site-management.firebaseapp.com",
  projectId: "woo-multi-site-management",
  storageBucket: "woo-multi-site-management.appspot.com",
  messagingSenderId: "1013631217909",
  appId: "1:1013631217909:web:084c78b27c314e175895bc",
  measurementId: "G-9DN9QNGBZB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
