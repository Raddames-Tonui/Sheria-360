import { createContext, useEffect, useState } from "react";
import { auth } from "../authentication/firebase"; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe(); 
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser(user); // Keep currentUser as Firebase User object
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const login = async (email, password) => {
    try {
      setError(null); 
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message); 
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError(null); 
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message); 
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to get the current user's token
  const getToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken(); // This will now work as currentUser is the Firebase User
    }
    return null; // Return null if user is not logged in
  };

  const contextData = {
    currentUser,
    userLoggedIn,
    loading,
    error, 
    login, 
    loginWithGoogle, 
    logout,
    getToken, 
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
