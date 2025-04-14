import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/UserAuthContext.jsx'; // Your AuthContext
import api from "../utils/axiosApi"; // One level up from src/pages/

const Login = () => {
  const navigate = useNavigate();
  const { setUser, fetchUser } = useAuth();

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    role: 'user', // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        formData,
        { withCredentials: true }
      );

      // Set user immediately (optional)
      console.log('this is user response after login', res);
      setUser(res.data.user);

      // Re-fetch current user (to refresh from backend)
      await fetchUser();
      
      // Show success message (optional)
      // showToast('Login successful', 'success');

      // Redirect based on role
      if (formData.role === 'admin') {
        navigate('/admin'); // Redirect to admin page
      } else if (formData.role === 'authority') {
        navigate('/authority/dashboard'); // Redirect to authority dashboard
      } else {
        navigate('/dashboard'); // Redirect to user home
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || 'Login Failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-400">PathFix</h1>
          <h2 className="text-xl font-semibold mt-2">Login to your account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selector */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded border bg-blue-400 text-white"
            >
              <option value="user">User</option>
              <option value="authority">Authority</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email or Phone */}
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-600">Email or Phone</label>
            <input
              type="text"
              id="emailOrPhone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              className="block w-full bg-blue-400 text-white p-2 rounded focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full bg-blue-400 text-white p-2 rounded focus:outline-none"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
