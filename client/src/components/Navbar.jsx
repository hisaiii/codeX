import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/UserAuthContext.jsx'; // correct path

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("this is user in navbar ",user);
  
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">PathFix</Link>
        </div>

        <ul className="flex space-x-6 text-gray-700 items-center">
          <li>
            <Link to="/report" className="hover:text-blue-600">Report Issue</Link>
          </li>

          {user ? (
            <>
              <li>
                <button onClick={handleProfileClick} className="flex items-center space-x-2">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-600"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-blue-600" />
                  )}
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-blue-600 text-sm">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
