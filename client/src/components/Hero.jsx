import React from 'react';
import img from '../images/3.jpg'; // apni image ka correct path lagana
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Left side: Image - full width of left */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Road Workers"
            className="max-w-[90%] h-auto object-contain"
          />
        </div>

        {/* Right side: Text + Buttons - full width of right */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 leading-snug">
            A FREE, EFFECTIVE, AND<br />
            CONVENIENT WAY TO GET<br />
            YOUR ROADS FIXED.
          </h2>

          <div className="flex flex-col items-center gap-3">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md w-80"
              onClick={() => navigate('/SignUp')}
            >
              Sign Up
            </button>
            <button
              className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 rounded-md w-80"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
