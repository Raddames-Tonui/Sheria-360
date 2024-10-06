import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "./firebase"; // Import Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import axios from "axios";
import toast from "react-hot-toast";
import AreYouALawyerModal from "./AreYouALawyerModal";
import { server_url } from "../../config.json";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUserId(user.uid);

      await axios.post(`${server_url}/auth/register`, {
        email: user.email,
        firebase_uid: user.uid,
      });

      toast.success("Registration successful!");
      setIsModalOpen(true);
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      setUserId(user.uid);

      await axios.post(`${server_url}/auth/register`, {
        email: user.email,
        firebase_uid: user.uid,
      });

      toast.success("Google registration successful!");
      setIsModalOpen(true);
    } catch (err) {
      toast.error(`Google registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmLawyer = async () => {
    console.log("Confirmed as lawyer");
    setIsModalOpen(false);
    setLoading(true); // Start loading

    try {
      await setDoc(doc(db, "users", userId), {
        email: email,
        role: "lawyer",
      });

      toast.success("You are now registered as a lawyer!");

      // Delay navigation to allow user to see the success message
      setTimeout(() => {
        navigate("/lawyer/registration"); // Redirect to lawyer-specific page
      }, 1000); // 1 second delay
    } catch (err) {
      console.error("Error saving lawyer role:", err);
      toast.error("Failed to register as a lawyer.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCloseModal = async () => {
    console.log("Not a lawyer selected");
    setIsModalOpen(false);

    setLoading(true); // Start loading

    try {
      await setDoc(doc(db, "users", userId), {
        email: email,
        role: "user",
      });

      toast.success("You are now registered as a user!");
      setTimeout(() => {
        navigate("/lawyers"); // Redirect to regular user-specific page
      }, 1000); // 1 second delay
    } catch (err) {
      console.error("Error saving user role:", err);
      toast.error("Failed to register as a user.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-slate-100">
      <div className="flex flex-col w-full max-w-md bg-white shadow-lg p-8 overflow-hidden border border-gray-300">
        <Link to="/" className="flex justify-center ">
          <img
            src="/logo/Sheria360.png"
            alt="Sheria 360 Logo"
            className="object-cover h-16 w-40"
          />
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-lime-500 transition duration-200"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-lime-500 transition duration-200"
              placeholder="Password"
            />
          </div>

          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-lime-500 transition duration-200"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded-md transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center justify-center my-2">
          <div className="border-t w-full"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="border-t w-full"></div>
        </div>

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full py-2 border border-black hover:bg-lime-600 font-bold rounded-md transition duration-300"
        >
          {loading ? "Registering..." : "Register with Google"}
        </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-lime-600 hover:text-lime-800">
            Log In
          </Link>
        </p>
      </div>

      <AreYouALawyerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // If not a lawyer
        onConfirm={handleConfirmLawyer} // If a lawyer
      />
    </div>
  );
};

export default Registration;
