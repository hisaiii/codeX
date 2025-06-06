import React from 'react';
import { Link } from 'react-router-dom';
import complaint from '../images/complaint.png';
import statistics from '../images/statistics.png';
import people from '../images/people.png';
import approval from '../images/approval.png';



const Dashboard = ({ username = "User" }) => {
    return (
        <div className="min-h-screen bg-white text-center">

            

            {/* Main Heading */}
            <h2 className="text-3xl font-bold text-blue-500 mt-8 mb-6">What do you want to do?</h2>

            {/* Options Grid */}
            <div className="space-y-6 max-w-2xl mx-auto px-4">
                <Link to="/report" className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-6 px-8 text-xl rounded-2xl flex justify-between items-center shadow-lg">
                    <span>Report An Issue</span>
                    <img src={complaint} alt="report" className="w-10 h-10" />
                </Link>

                <Link to="/track-mycomplaints" className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-6 px-8 text-xl rounded-2xl flex justify-between items-center shadow-lg">
                    <span>Track Your Reports</span>
                    <img src={approval  } alt="track" className="w-10 h-10" />
                </Link>

                <Link to="/complaints" className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-6 px-8 text-xl rounded-2xl flex justify-between items-center shadow-lg">
                    <span>Go to Community Page</span>
                    <img src={people} alt="community" className="w-10 h-10" />
                </Link>

                <Link to="/stats" className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-6 px-8 text-xl rounded-2xl flex justify-between items-center shadow-lg">
                    <span>Check Your City Statistics</span>
                    <img src={statistics} alt="stats" className="w-10 h-10" />
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;