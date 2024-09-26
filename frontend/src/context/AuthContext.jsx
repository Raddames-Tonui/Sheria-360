import { createContext, useEffect, useState } from "react";
import { auth } from "../authentication/firebase"; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe(); 
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const login = async (email, password) => {
    try {
      setError(null); // Clear previous errors
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message); // Set error message for UI feedback
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError(null); // Clear previous errors
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message); // Set error message for UI feedback
    }
  };

  const logout = async () => {
    try {
      setError(null); // Clear previous errors
      await signOut(auth);
    } catch (err) {
      setError(err.message); // Set error message for UI feedback
    }
  };

  const contextData = {
    currentUser,
    userLoggedIn,
    loading,
    error, 
    login, 
    loginWithGoogle, // Add the new function to context
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
