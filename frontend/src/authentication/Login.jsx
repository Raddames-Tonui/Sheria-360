import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { login, loginWithGoogle, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (error) {
      toast.error(`Login failed, please check your credentials`);
    } else {
      toast.success('Login successful!');
      navigate('/Lawyers');
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    if (error) {
      toast.error(`Google login failed: ${error}`);
    } else {
      toast.success('Google login successful!');
      navigate('/Lawyers');
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col w-full max-w-md bg-white shadow-lg p-8 overflow-hidden border border-gray-300">
      <Link to="/" className="flex justify-center ">
          <img src="/logo/Sheria360.png" alt="" className="object-cover h-16 w-40" />
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

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
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-lime-500 transition duration-200"
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
              className="block w-full border-b border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-0 focus:border-lime-500 transition duration-200"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <Link to="/forgot-password" className="text-sm text-lime-600 hover:text-lime-800 transition duration-200">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center my-2">
          <div className="border-t w-full"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="border-t w-full"></div>
        </div>
        
        <button 
          onClick={handleGoogleLogin} 
          className="w-full py-2 border border-black hover:bg-lime-600 font-bold rounded-md transition duration-300"
        >
          Login with Google
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-lime-600 hover:text-lime-800 transition duration-200"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
