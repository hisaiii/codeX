// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "user", // default
    city: "",
    district: "",
    state: "",
    profilePicture: null,
  });
 const {showToast} = useToast();
 const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
    //   alert("Passwords do not match!");
      showToast("Password does not match","info")
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("password", formData.password);
    payload.append("role", formData.role);
    if (formData.profilePicture) {
      payload.append("profilePicture", formData.profilePicture);
    }
    if (formData.role === "authority") {
      payload.append("city", formData.city);
      payload.append("district", formData.district);
      payload.append("state", formData.state);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`, 
        payload,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
    //   alert("Registered Successfully!");
        showToast("Registered successfully","success");
        navigate("/account-created");
        
      console.log(res.data);
    } catch (err) {
      console.error(err);
    //   alert(err.response?.data?.msg || "Registration Failed");
      showToast("Registration Failed ","error")
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Role Selection */}
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

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          />

          {/* Phone Number */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
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

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          />

          {/* Extra Fields for Authority */}
          {formData.role === "authority" && (
            <>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </>
          )}

          {/* Profile Picture Upload */}
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 rounded border"
          />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
