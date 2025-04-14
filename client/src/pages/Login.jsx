// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserAuthContext.jsx"; // Your AuthContext
import { useToast } from "../contexts/ToastContext.jsx";
const Login = () => {
  const navigate = useNavigate();
  const { setUser, fetchUser } = useAuth();
  const {showToast} = useToast();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    role: "user", // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      console.log("this is user reponse after login ",res);
      setUser(res.data.user);

      // Re-fetch current user (to refresh from backend)
      await fetchUser();
      showToast("Login successfull ","success");
      // alert("Login Successful!");

      if (formData.role === "authority") {
        navigate("/authority/dashboard"); // Redirect to authority dashboard
      } else if (formData.role === "admin") {
        navigate("/admin"); // Redirect to admin page
      } else {
        navigate("/"); // Redirect to user home
      }

    } catch (error) {
      console.error(error);
      // alert(error.response?.data?.msg || "Login Failed");
      showToast("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Role Selector */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          >
            <option value="user">User</option>
            <option value="authority">Authority</option>
            <option value="admin">Admin</option>
          </select>

          {/* Email or Phone */}
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
