// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "collabin-c8f9f.firebaseapp.com",
  projectId: "collabin-c8f9f",
  storageBucket: "collabin-c8f9f.appspot.com",
  messagingSenderId: "928016449574",
  appId: "1:928016449574:web:adcc0c93f28f204397e6e7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

