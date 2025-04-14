import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AccountCreated = () => {
  const location = useLocation();
  const username = location.state?.username || "User";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-white text-black p-10 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-500">PathFix</h1>
          <div>
            
            <Link to="/login" className="px-4 py-1 border rounded bg-blue-200 hover:bg-blue-300 text-sm">Login</Link>
          </div>
        </div>

        <img src="/images/success.png" alt="success" className="mx-auto w-32 h-32 my-4" />

        <h2 className="text-xl font-semibold">Congratulations <span className="text-blue-500">@{username}</span>!</h2>
        <p className="mt-2">Your account has been successfully created.</p>
        <Link to="/login" className="text-blue-500 font-semibold mt-4 inline-block underline">Login now!</Link>


       
      </div>
    </div>
  );
};

export default AccountCreated;
