import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#60a5fa] shadow px-6 py-4 flex justify-between items-center">
      {/* PathFix logo with link to home */}
      <Link to="/" className="text-blue-800 font-bold text-2xl">
        Pathfix
      </Link>

      {/* Right side nav options */}
      <div className="space-x-4 text-black">
        <Link to="/report" className="hover:underline">Report Issue</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
