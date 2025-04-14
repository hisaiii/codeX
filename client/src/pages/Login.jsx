import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import for navigation

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });

  const navigate = useNavigate(); // <-- Hook to redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data submitted:", formData);
    
    // ⬇️ Placeholder for actual API login
    // After successful login, navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-400">PathFix</h1>
          <h2 className="text-xl font-semibold mt-2">Login to your account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <div className="flex mt-1">
              <span className="inline-flex items-center px-3 bg-blue-400 text-white rounded-l border-r border-blue-500">
                +91
              </span>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full bg-blue-400 text-white p-2 rounded-r focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full bg-blue-400 text-white p-2 rounded focus:outline-none"
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
