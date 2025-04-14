import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CityFilterComplaints = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all unique cities from authorities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/authorities/cities');
        setCities(response.data);
        console.log("this is cityies",response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cities');
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  // Fetch complaints when city changes
  useEffect(() => {
    if (selectedCity) {
      const fetchComplaints = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/complaint/complaints/city/${selectedCity}`);
          setComplaints(response.data.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch complaints');
          setLoading(false);
        }
      };
      fetchComplaints();
    }
  }, [selectedCity]);

  const handleUpvote = async (complaintId) => {
    try {
      await axios.post(`/api/complaints/${complaintId}/upvote`, {}, {
        withCredentials: true
      });
      setComplaints(complaints.map(complaint => 
        complaint._id === complaintId 
          ? { ...complaint, upvotes: [...complaint.upvotes, 'user-id'] } // Replace with actual user ID
          : complaint
      ));
    } catch (err) {
      console.error('Upvote failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">City Complaints</h1>
        <p className="text-gray-600">View and manage complaints by city</p>
      </header>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filter */}
        <div className="w-full md:w-64 bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Filter</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-2">Select City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto"></div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <div 
                  key={complaint._id} 
                  className="bg-white border border-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={complaint.imageUrl} 
                      alt={complaint.damageType}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {complaint.status}
                      </span>
                      <button 
                        onClick={() => handleUpvote(complaint._id)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        {complaint.upvotes?.length || 0}
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold text-blue-800 mb-2 capitalize">
                      {complaint.damageType}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {complaint.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                      <span className="text-blue-600">{complaint.city}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                {selectedCity ? (
                  <p className="text-gray-500">No complaints found for {selectedCity}</p>
                ) : (
                  <p className="text-gray-500">Select a city to view complaints</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityFilterComplaints;