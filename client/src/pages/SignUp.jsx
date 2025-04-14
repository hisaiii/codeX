import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      profilePicture: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/account-created', { state: { username: formData.username } });

    // Yahan API call wagaira laga sakte ho
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-400">PathFix</h1>
            <h2 className="text-2xl font-bold mt-2">Create Your Free Account</h2>
            <p className="text-sm mt-1">
              Already have an account? <a href="#" className="text-blue-500 hover:underline">Login here</a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400">Phone Number</label>
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
                  className="block w-full bg-blue-400 text-white p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full bg-blue-400 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

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
                <div className="flex">
                  <input
                    type="text"
                    className="block w-full bg-blue-400 text-white p-2 rounded-l focus:outline-none"
                    placeholder="No file chosen"
                    readOnly
                    value={formData.profilePicture ? formData.profilePicture.name : ''}
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
