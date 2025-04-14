import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/UserAuthContext.jsx';

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
    <nav className="bg-[#60a5fa] shadow px-6 py-4 flex justify-between items-center">
      {/* Logo (styled like first code) */}
      <Link to="/" className="text-blue-800 font-bold text-2xl">
        Pathfix
      </Link>

      {/* Navigation (styled like first code but with second code's logic) */}
      <div className="flex w-[30%] text-black text-lg">
        <Link to="/report" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 mx-4 py-2 rounded-md w-40"
              >Report Issue</Link>

        {user ? (
          <>
            <button 
              onClick={handleProfileClick} 
              className="flex items-center text-lg space-x-2 hover:underline cursor-pointer"
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-800"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-blue-800" />
              )}
            </button>
            <button 
              onClick={handleLogout} 
              className="hover:underline text-lg px-2 text-blue-800 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline text-blue-800 cursor-pointer">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;