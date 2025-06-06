import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/UserAuthContext.jsx';
import userIcon from "../images/user_icon.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#60a5fa] shadow md:px-4 py-3">
      <div className="flex flex-row flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-blue-800 font-bold text-xl md:text-2xl">
          Pathfix
        </Link>
       <div className='w-[70%] md:justify-end flex gap-4 lg:gap-10'>
          {/* Navigation Links */}
        <Link
          to="/complaints"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-6 py-1 md:py-2 rounded-md text-sm md:text-base"
        >
          Complaints Forum
        </Link>

        <Link
          to="/report"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-6 py-1 md:py-2 rounded-md text-sm md:text-base"
        >
          Report Issue
        </Link>

        {/* Profile */}
        {user && (
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 text-sm md:text-base hover:underline cursor-pointer"
          >
            {user.profileImage ? (
              <img
                src={`${user.profileImage}||${userIcon}`}
                alt="Profile"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 border-blue-800"
              />
            ) : (
              <FaUserCircle className="w-7 h-7 md:w-8 md:h-8 text-blue-800" />
            )}
          </button>
        )}

        {/* Logout (only visible on md and up) */}
        {user && (
          <button
            onClick={handleLogout}
            className="hidden md:block hover:underline text-blue-800 text-lg cursor-pointer"
          >
            Logout
          </button>
        )}

        {/* Login (only if no user) */}
        {!user && (
          <Link to="/login" className="hover:underline text-blue-800 text-sm md:text-lg cursor-pointer">
            Login
          </Link>
        )}

       </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
