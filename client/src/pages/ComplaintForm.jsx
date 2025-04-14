

        import React, { useRef, useState, useEffect } from 'react';
        import axios from 'axios';

        const ComplaintForm = () => {
        const videoRef = useRef(null);
        const canvasRef = useRef(null);

        const [capturedImage, setCapturedImage] = useState(null);
        const [description, setDescription] = useState('');
        const [coords, setCoords] = useState({ lat: null, lng: null });
        const [address, setAddress] = useState('');
        const [loading, setLoading] = useState(false);
        const [cameraOn, setCameraOn] = useState(false);

        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // <-- Replace with your actual key

        // 📍 Reverse Geocode to get address
        const fetchAddress = async (lat, lng) => {
            try {
            const res = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
                {
                headers: {
                    'User-Agent': 'YourAppName/1.0 (your-email@example.com)', // Replace with your app name and email
                },
                }
            );
            if (res.data && res.data.display_name) {
                setAddress(res.data.display_name);
                console.log('Detected Address:', res.data.display_name);
            } else {
                console.error('No address found');
            }
            } catch (err) {
            console.error('Failed to fetch address from Nominatim:', err);
            }
        };

        // 🌍 Get location
        useEffect(() => {
            const fetchLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                const { latitude, longitude } = pos.coords;
                setCoords({ lat: latitude, lng: longitude });
                fetchAddress(latitude, longitude); // 👈 Reverse geocode
                },
                (err) => {
                alert('Location access denied ❌');
                console.error(err);
                }
            );
            };

            fetchLocation(); // Get the location on component mount
            const locationInterval = setInterval(fetchLocation, 5000); // Refresh location every 5 seconds (optional)
            return () => clearInterval(locationInterval); // Clean up interval on component unmount
        }, []);

        // 🎥 Start camera
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
                alert('Could not access camera ❌');
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
            setCapturedImage(new File([blob], 'snapshot.jpg', { type: 'image/jpeg' }));
            }, 'image/jpeg');
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            // Early exit if conditions are not met
            if (!capturedImage) {
            alert('❗ Please capture a photo before submitting.');
            return;
            }
            if (!coords.lat || !coords.lng) {
            alert('❗ Location not yet detected. Please allow location access.');
            return;
            }
            if (!address) {
            alert('❗ Address not yet detected. Please wait a moment...');
            return;
            }

            // If all conditions are met, submit the complaint
            setLoading(true);
            const formData = new FormData();
            formData.append('description', description);
            formData.append('userId', '67fbbf3d5b9c10e768d4fc36'); // Replace with dynamic user ID
            formData.append('image', capturedImage);
            formData.append('lat', coords.lat);
            formData.append('lng', coords.lng);
            formData.append('address', address);

            try {
            const res = await axios.post('http://localhost:5000/api/complaint/create-complaint', formData);
            console.log('✅ Complaint submitted:', res.data);
            alert('Complaint submitted successfully ✅');

            // Reset form
            setDescription('');
            setCapturedImage(null);
            setCameraOn(false);
            setAddress('');
            setCoords({ lat: null, lng: null });
            } catch (err) {
            console.error('❌ Submission error:', err);
            alert('Error submitting complaint ❌');
            } finally {
            setLoading(false);
            }
        };

        return (
            <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📸 Report an Issue</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Describe the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                </div>

                <div className="space-y-2">
                {!cameraOn ? (
                    <button
                    type="button"
                    onClick={startCamera}
                    className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
                    >
                    🎥 Start Camera
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-md shadow-md" />
                    <button
                        type="button"
                        onClick={captureImage}
                        className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                    >
                        📸 Capture Photo
                    </button>
                    </div>
                )}
                </div>

                {capturedImage && (
                <div>
                    <p className="text-gray-600 text-sm mb-1">📷 Captured Image Preview:</p>
                    <img src={URL.createObjectURL(capturedImage)} alt="Snapshot" className="rounded-md shadow-md" />
                </div>
                )}

                {address && (
                <div className="text-sm text-gray-700">
                    📍 <strong>Address:</strong> {address}
                </div>
                )}

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700"
                >
                {loading ? 'Submitting...' : '🚀 Submit Complaint'}
                </button>
            </form>

            <canvas ref={canvasRef} className="hidden" />
            </div>
        );
        };

        export default ComplaintForm;

