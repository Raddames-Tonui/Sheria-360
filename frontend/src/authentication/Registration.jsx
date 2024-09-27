import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import toast from 'react-hot-toast';
import backgroundImage from '../assets/books.jpeg';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registration successful!');

      // Prompt the user if they are a lawyer
      const isLawyer = window.confirm("Are you a lawyer?");

      // Navigate based on user's response
      if (isLawyer) {
        navigate('/lawyer-registration');
      } else {
        navigate('/lawyers');
      }
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Google registration successful!');
      navigate('/');
    } catch (err) {
      toast.error(`Google registration failed: ${err.message}`);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section */}
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
                autoComplete="username email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
            >
              Register
            </button>
          </form>

          <div className="flex items-center justify-center mt-4">
            <div className="border-t w-full"></div>
            <span className="p-4 text-gray-500">OR</span>
            <div className="border-t w-full"></div>
          </div>

          <button
            onClick={handleGoogleRegister}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300"
          >
            Register with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Log In
            </Link>
          </p>
        </div>

        {/* Background Image Section */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="h-full flex flex-col justify-center items-center bg-black bg-opacity-50 p-8 text-center">
            <h3 className="text-3xl font-bold text-white">Join Us!</h3>
            <p className="mt-4 text-lg text-white">Create your account to start managing your legal services.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
