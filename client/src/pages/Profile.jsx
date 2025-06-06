import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserAuthContext.jsx";
import userIcon from "../images/user_icon.png";

const Profile = () => {
  const { user, loading, logout, initialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && !user) {
      navigate("/login");
    }
  }, [user, initialized, navigate]);

  if (!initialized || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 mx-auto"></div>
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleDashboardRedirect = () => {
    if (user?.role === "authority") {
      navigate("/authority-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 py-12">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <img
            src={user?.avatar || userIcon}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

        <h2 className="text-2xl font-bold text-white">{user?.name || "No Name"}</h2>
        <p className="text-gray-400 mt-1">{user?.email || "No Email"}</p>

        <div className="mt-4 text-gray-400 space-y-1">
          <p>Verified: {user?.isVerified ? "Yes" : "No"}</p>
          <p>Auth Provider: {user?.authProvider || "N/A"}</p>
          <p>Role: {user?.role || "Not Assigned"}</p>
        </div>

        <button
          onClick={handleDashboardRedirect}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          {user?.role === "authority" ? "Go to Authority Dashboard" : "Go to Dashboard"}
        </button>

        <button
          onClick={logout}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
