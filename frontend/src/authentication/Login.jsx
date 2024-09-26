import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import backgroundImage from '../assets/books.jpeg';

const Login = () => {
  const { login, loginWithGoogle, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (error) {
      toast.error(`Login failed: ${error}`);
    } else {
      toast.success('Login successful!');
      navigate('../Lawyers');
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    if (error) {
      toast.error(`Google login failed: ${error}`);
    } else {
      toast.success('Google login successful!');
      navigate('../Lawyers');
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <Link to="/" className="text-3xl text-center font-bold text-blue-600 hover:text-blue-800 transition duration-300 mb-2  ">
            Sheria 360
          </Link>
          <h2 className="text-2xl font-bold mb-6 text-center ">Log In</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition duration-200">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-center">
          <div className="border-t w-full"></div>
          <span className="p-4 text-gray-500">OR</span>
          <div className="border-t w-full"></div>
        </div> 
          <button 
            onClick={handleGoogleLogin} 
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300"
          >
            Login with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Background Image Section */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="h-full flex flex-col justify-center items-center bg-black bg-opacity-50 p-8 text-center">
            <h3 className="text-3xl font-bold text-white">Welcome Back!</h3>
            <p className="mt-4 text-lg text-white">Login to access your account and manage your job applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
