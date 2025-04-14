import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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
        //profilePicture: null,
    });

    // const { showToast } = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        profilePicture: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
        showToast("Password does not match", "info");
        return;
        }

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
            payload.append(key, value);
        }
        });

        try {
        const res = await axios.post(
            `http://localhost:5000/api/auth/register`,
            payload,
            {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            }
        );
        showToast("Registered successfully", "success");
        navigate("/account-created");
        console.log(res.data);
        } catch (err) {
        console.error(err);
        showToast("Registration Failed", "error");
        }
    };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-400">PathFix</h1>
            <h2 className="text-2xl font-bold mt-2">Create Your Free Account</h2>
            <p className="text-sm mt-1">
              Already have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Login here
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="authority">Authority</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Phone Number</label>
              <div className="flex mt-1">
                <span className="inline-flex items-center px-3 bg-blue-400 text-white rounded-l border-r border-blue-500">
                  +91
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block w-full bg-blue-400 text-white p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Authority Fields */}
            {formData.role === "authority" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-400">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </>
            )}

            {/* Profile Pic */}
            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-400">Profile Picture (Optional)</label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="flex w-full">
                  <input
                    type="text"
                    className="block w-full bg-blue-400 text-white p-2 rounded-l focus:outline-none"
                    placeholder="No file chosen"
                    readOnly
                    value={formData.profilePicture ? formData.profilePicture.name : ""}
                  />
                  <label
                    htmlFor="profilePicture"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-r bg-gray-300 hover:bg-gray-400 cursor-pointer"
                  >
                    Choose Here
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
