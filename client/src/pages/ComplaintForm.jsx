import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  // Refs for camera
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    damageType: 'pothole',
    description: ''
  });
  const [capturedImage, setCapturedImage] = useState(null);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [locationDetails, setLocationDetails] = useState({
    address: '',
    city: '',
    district: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState('');

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Extract location details from reverse geocoding
  const extractLocationDetails = (data) => {
    const details = {
      address: data.display_name || '',
      city: data.address?.city || data.address?.town || data.address?.village || '',
      district: data.address?.county || '',
      state: data.address?.state || ''
    };
    setLocationDetails(details);
    return details;
  };

  // 📍 Reverse Geocode to get detailed address
  const fetchAddressDetails = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
            headers: {
                'Accept': 'application/json'
              }
        }
      );
      if (res.data) {
        return extractLocationDetails(res.data);
      }
      throw new Error('No address data received');
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Failed to fetch location details');
      return null;
    }
  };

  // 🌍 Get location
  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lng: longitude });
          await fetchAddressDetails(latitude, longitude);
        },
        (err) => {
          setError('Location access denied. Please enable permissions.');
          console.error(err);
        }
      );
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // 🎥 Camera handling
  useEffect(() => {
    const enableCamera = async () => {
      if (cameraOn && videoRef.current) {
        try {
          const constraints = {
            video: {
              facingMode: isMobile ? { exact: 'environment' } : 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          videoRef.current.srcObject = stream;
        } catch (err) {
          setError('Camera access denied');
          console.error(err);
        }
      }
    };
    enableCamera();
  }, [cameraOn]);

  const startCamera = () => setCameraOn(true);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      setCapturedImage(new File([blob], 'complaint_photo.jpg', { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.9);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!capturedImage) {
      setError('Please capture a photo of the issue');
      setLoading(false);
      return;
    }
    if (!coords.lat || !coords.lng) {
      setError('Location not detected. Please enable GPS.');
      setLoading(false);
      return;
    }
    if (!locationDetails.city || !locationDetails.district || !locationDetails.state) {
      setError('Could not determine complete location details');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', capturedImage);
      formDataToSend.append('damageType', formData.damageType);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('lat', coords.lat);
      formDataToSend.append('lng', coords.lng);
      formDataToSend.append('address', locationDetails.address);
      formDataToSend.append('city', locationDetails.city);
      formDataToSend.append('district', locationDetails.district);
      formDataToSend.append('state', locationDetails.state);

      // JWT will be automatically sent via cookies
      const res = await axios.post('http://localhost:5000/api/complaint/create-complaint', formDataToSend, {
        withCredentials: true // Important for sending cookies
      });
      
      // Reset form on success
      setFormData({
        damageType: 'pothole',
        description: ''
      });
      setCapturedImage(null);
      setCameraOn(false);
      alert('Complaint submitted successfully!');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Report Road Issue</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Damage Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Type of Damage *
          </label>
          <select
            name="damageType"
            value={formData.damageType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="pothole">Pothole</option>
            <option value="crack">Road Crack</option>
            <option value="manhole">Manhole Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Describe the issue in detail..."
            required
          />
        </div>

        {/* Photo Capture */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium mb-2">
            Photo Evidence *
          </label>
          
          {!cameraOn ? (
            <button
              type="button"
              onClick={startCamera}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              🎥 Open Camera
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full rounded-md shadow-md border border-gray-200"
              />
              <button
                type="button"
                onClick={captureImage}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                📸 Capture Photo
              </button>
            </div>
          )}

          {capturedImage && (
            <div className="mt-4">
              <p className="text-gray-600 mb-2">Captured Image:</p>
              <img 
                src={URL.createObjectURL(capturedImage)} 
                alt="Complaint evidence" 
                className="rounded-md shadow-md max-h-64 object-contain border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Location Info */}
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Location Details</h3>
          {locationDetails.address ? (
            <div className="space-y-2">
              <p className="text-gray-700">{locationDetails.address}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">City:</span> {locationDetails.city || 'Not detected'}
                </div>
                <div>
                  <span className="font-medium">District:</span> {locationDetails.district || 'Not detected'}
                </div>
                <div>
                  <span className="font-medium">State:</span> {locationDetails.state || 'Not detected'}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Coordinates: {coords.lat?.toFixed(6)}, {coords.lng?.toFixed(6)}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Fetching location details...</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !capturedImage || !coords.lat || !locationDetails.city}
          className={`w-full py-3 px-4 rounded-md font-semibold text-white ${
            loading || !capturedImage || !coords.lat || !locationDetails.city
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } transition-colors`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : 'Submit Complaint'}
        </button>
      </form>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ComplaintForm;