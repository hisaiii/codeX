import React, { useState } from "react";

const ReportError = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    issueType: "",
    photo: null,
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.issueType || !formData.photo || !formData.location) {
      setErrorMessage("Please fill all required fields.");
      return;
    }
    setErrorMessage("");
    console.log(formData);
    // Yaha API call kar sakte ho
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between bg-white p-4 shadow">
        <h1 className="text-2xl font-bold text-blue-600">PathFix</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">&lt;username&gt;</span>
        </div>
      </header>

      {/* Main Form */}
      <main className="flex flex-col items-center flex-1 p-8 bg-blue-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold mb-2">Report Your Issue Here</h2>

          {errorMessage && (
            <p className="text-red-500 font-semibold">
              Sorry, {errorMessage}
            </p>
          )}

          {/* Type of Issue */}
          <div>
            <label className="block mb-1 font-semibold">Type Of Issue*</label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select an issue</option>
              <option value="pothole">Pothole</option>
              <option value="streetlight">Streetlight Problem</option>
              <option value="garbage">Garbage Issue</option>
              <option value="water">Water Leakage</option>
            </select>
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block mb-1 font-semibold">Upload Photo*</label>
            <div className="border-2 border-dashed border-blue-400 bg-blue-100 p-8 flex flex-col items-center justify-center rounded relative">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="opacity-0 absolute w-full h-full cursor-pointer"
                style={{ zIndex: 2 }}
              />
              <span className="text-4xl">📷</span>
              <p className="text-gray-600">Click to upload</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-semibold">Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Address autofilled but editable"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Max. 1000 characters"
              maxLength={1000}
              rows="4"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full font-bold"
          >
            SUBMIT
          </button>
        </form>
      </main>
    </div>
  );
};

export default ReportError;
