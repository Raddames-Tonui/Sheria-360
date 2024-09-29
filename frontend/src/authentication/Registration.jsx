import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';  
import toast from 'react-hot-toast';
import AreYouALawyerModal from './AreYouALawyerModal';
import { server_url } from "../../config.json";

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
      <div className="flex flex-col w-full max-w-md bg-white shadow-lg p-8 rounded-lg overflow-hidden h-4/5">
        <Link to="/" className="flex justify-center ">
          <img src="/logo/Sheria360.png" alt="" className="object-cover h-16 w-40" />
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
            className="w-full py-2 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded-md transition duration-300"
          >
            Register
          </button>
        </form>

        {/* <div className="flex items-center justify-center my-2">
          <div className="border-t w-full"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="border-t w-full"></div>
        </div> */}

        {/* <button
          onClick={handleGoogleRegister}
          className="w-full py-2 border border-black hover:bg-lime-600 font-bold rounded-md transition duration-300"
        >
          Register with Google
        </button> */}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-lime-600 hover:text-lime-800">
            Log In
          </Link>
        </p>
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
