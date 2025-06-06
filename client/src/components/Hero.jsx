import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/UserAuthContext.jsx';
import first from "../images/1.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Left side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={first} 
            alt="Road workers fixing roads"
            className="max-w-[90%] h-auto rounded-lg"
          />
        </div>

        {/* Right side: Text + Buttons */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 leading-snug">
            A SAFE, RELIABLE, AND CONVENIENT WAY TO GET YOUR ROADS FIXED
          </h2>

          <div className="flex flex-col items-center gap-3">
            {!user ? (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md w-80"
                  onClick={() => navigate('/register')}
                >
                  Register
                </button>
                <button
                  className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 rounded-md w-80"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-80 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
