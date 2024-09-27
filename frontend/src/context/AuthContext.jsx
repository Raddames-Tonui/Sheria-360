import { createContext, useEffect, useState } from "react";
import { auth } from "../authentication/firebase"; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [token, setToken] = useState(null); // State to hold the token

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe(); 
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({
        uid: user.uid,
        email: user.email,
      });
      setUserLoggedIn(true);
      const token = await user.getIdToken(); // Get token when user logs in
      setToken(token); // Save token in state
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setToken(null); // Clear token on logout
    }
    setLoading(false);
  }

  const login = async (email, password) => {
    try {
      setError(null); 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken(); // Get token after login
      setToken(token); // Store token in state
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
      const token = await user.getIdToken(); // Get token after login
      setToken(token); // Store token in state
    } catch (err) {
      setError(err.message); 
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setToken(null); // Clear token on logout
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to refresh the token
  const refreshToken = async () => {
    if (currentUser) {
      const newToken = await currentUser.getIdToken(true); // Force refresh the token
      setToken(newToken); // Update token in state
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
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
