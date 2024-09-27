import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';  
import toast from 'react-hot-toast';
import backgroundImage from '../assets/books.jpeg';
import AreYouALawyerModal from './AreYouALawyerModal';
import {server_url} from "../../config.json"

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Now send the email and Firebase UID to your backend
      await axios.post(`${server_url}/api/register`, {
        email: user.email,
        firebase_uid: user.uid,  // Get the UID from the Firebase user
      });

      toast.success('Registration successful!');
      setIsModalOpen(true);
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    }
  };

  const handleGoogleRegister = async () => {
    // Google registration logic (not modified)
  };

  const handleConfirmLawyer = () => {
    setIsModalOpen(false);
    navigate('/lawyer-registration');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/lawyers');
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <Link to="/" className="text-3xl text-center font-bold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            Sheria 360
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
                className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900"
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
                className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-md"
            >
              Register
            </button>
          </form>

          <div className="flex items-center justify-center mt-4">
            <span className="p-4 text-gray-500">OR</span>
          </div>

          <button
            onClick={handleGoogleRegister}
            className="w-full py-2 bg-red-500 text-white font-bold rounded-md"
          >
            Register with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Log In
            </Link>
          </p>
        </div>

        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      </div>

      <AreYouALawyerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLawyer}
      />
    </div>
  );
};

export default Registration;
