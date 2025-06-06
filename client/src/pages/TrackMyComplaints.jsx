import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackMyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/complaint/users/complaints', {
          withCredentials: true
        });
        console.log("this is complaints fetch",res);
        setComplaints(res.data);
      } catch (err) {
        setError("Couldn't fetch your complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchMyComplaints();
  }, []);

  if (loading) return <p className="text-center p-8">Loading...</p>;

  if (error) return <p className="text-center text-red-600 p-8">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">My Complaints</h2>
      
      {complaints.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any complaints yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white p-4 shadow rounded-lg">
              <img src={complaint.imageUrl} alt="damage" className="h-40 w-full object-cover rounded" />
              <h3 className="text-lg font-semibold text-blue-700 mt-2 capitalize">{complaint.damageType}</h3>
              <p className="text-gray-600">{complaint.description}</p>
              <p className="text-sm text-gray-400 mt-2">{new Date(complaint.createdAt).toLocaleString()}</p>
              <span className="text-sm text-blue-500">Status: {complaint.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackMyComplaints;