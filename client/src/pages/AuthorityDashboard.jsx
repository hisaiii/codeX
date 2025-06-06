import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/UserAuthContext.jsx";
import axios from "axios";

const AuthorityDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/complaint/complaints/city/${user.city}`);
        console.log("these are compliants",response);
        setComplaints(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "authority") {
      fetchComplaints();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {user?.city} Authority Dashboard
      </h1>

      {loading ? (
        <div className="text-center text-gray-400">Loading complaints...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : complaints.length === 0 ? (
        <div className="text-center text-gray-400">No complaints found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-400">
                {complaint.title}
              </h2>
              <p className="text-sm text-gray-300 mb-2">{complaint.description}</p>

              <div className="text-sm text-gray-400 mb-1">
                <span className="font-medium">Filed by:</span> {complaint.userName}
              </div>

              <div className="text-sm text-gray-400 mb-1">
                <span className="font-medium">Location:</span> {complaint.location}
              </div>

              <div className="text-sm mt-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    complaint.status === "resolved"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-600 text-white"
                  }`}
                >
                  {complaint.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorityDashboard;
