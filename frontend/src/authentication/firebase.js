// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkloAugrxN4TI_1iRyNkOtpFqcDGsSjdU",
  authDomain: "sheria-365.firebaseapp.com",
  projectId: "sheria-365",
  storageBucket: "sheria-365.appspot.com",
  messagingSenderId: "997156812414",
  appId: "1:997156812414:web:eed532df1992983c030a2f",
  measurementId: "G-JPE474ST58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export the auth instance
export { auth, app };
