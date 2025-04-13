import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Pathfix</div>
        <ul className="flex space-x-6 text-gray-700">
          <li><Link to="/report" className="hover:text-blue-600">Report Issue</Link></li>
          <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
