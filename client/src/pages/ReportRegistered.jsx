import React from "react";
import { Link } from "react-router-dom";

const ReportRegistered = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between bg-white p-4 shadow">
        <h1 className="text-2xl font-bold text-blue-600">PathFix</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">&lt;username&gt;</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-8">
        <div className="mb-8">
          <div className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center">
            📄
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl text-blue-600 font-semibold">
            Your Report has been <br /> Registered Successfully.
          </h2>
          <p className="mt-4 text-gray-700">
            Would you like to{" "}
            <Link to="/Track" className="text-black underline font-semibold">
              track it now?
            </Link>{" "}
            <br />
            Or{" "}
            <Link to="/profile" className="text-black underline font-semibold">
              go your page?
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-4 text-center text-sm">
        <p>Help and Support</p>
        <p>Contact No.: +91 7999927761</p>
        <p>Email: codebrown@gmail.com</p>
        <p>copyright@codebrown</p>
      </footer>
    </div>
  );
};

export default ReportRegistered;
