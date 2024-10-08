// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import { auth } from "../authentication/firebase"; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../authentication/firebase"; // Import your Firestore configuration

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(''); // State to hold user role

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
        });
        setUserLoggedIn(true);
        const token = await user.getIdToken();
        setToken(token);

        // Fetch the user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role); // Set user role from Firestore
        } else {
          console.error("No such document!");
        }

      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setToken(null);
        setUserRole(''); // Reset role on sign out
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      setToken(token);
      console.log("User Token:", token); // Log the token to the console

      // Fetch the user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserRole(userDoc.data().role); // Set user role from Firestore
      }

    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError(null);
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const token = await user.getIdToken();
      setToken(token);
      // console.log("User Token:", token); 
      // Fetch the user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserRole(userDoc.data().role); // Set user role from Firestore
      }

    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setToken(null);
      setUserRole(''); // Reset role on sign out
    } catch (err) {
      setError(err.message);
    }
  };

  const refreshToken = async () => {
    if (currentUser) {
      const newToken = await currentUser.getIdToken(true);
      setToken(newToken);
      return newToken;
    }
    return null;
  };

  const contextData = {
    currentUser,
    userLoggedIn,
    loading,
    error, 
    login, 
    loginWithGoogle, 
    logout,
    token, 
    refreshToken,
    userRole, 
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
