import React, { useEffect, useState } from 'react';
import Donornavbar from './Donornavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaUsers, FaArrowUp, FaGift } from 'react-icons/fa'; // Imported icons

const Donorhome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the logged-in user's details from the backend
    axios
      .get("http://localhost:2024/donor/api/getLoggedInDonor", {
        withCredentials: true, // To send the session cookie along with the request
      })
      .then((response) => {
        console.log(response.data); // Check the response data
        setUser(response.data); // Save user data in the state
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Donornavbar />
      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {user ? user.name : 'Loading...'}
            </h2> {/* Display user name with Tailwind CSS */}
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <i className="fas fa-search"></i>
            </div>
            <div className="bell-icon">
              <i className="fas fa-bell"></i>
            </div>
          </div>

          {/* Main Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Impact Statistics */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">Your Impact</h3>
                <p className="text-blue-100">See the difference you're making in the world</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-6">
                <div className="text-center">
                  <FaHeart className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <h4 className="text-xl font-semibold text-gray-700">Total Donations</h4>
                  <p className="text-3xl font-bold text-blue-600">$12,345</p>
                </div>
                <div className="text-center">
                  <FaUsers className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <h4 className="text-xl font-semibold text-gray-700">Lives Impacted</h4>
                  <p className="text-3xl font-bold text-green-600">1,234</p>
                </div>
                <div className="text-center">
                  <FaArrowUp className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h4 className="text-xl font-semibold text-gray-700">Donation Growth</h4>
                  <p className="text-3xl font-bold text-purple-600">+15%</p>
                </div>
                <div className="text-center">
                  <FaGift className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                  <h4 className="text-xl font-semibold text-gray-700">Campaigns Supported</h4>
                  <p className="text-3xl font-bold text-yellow-600">7</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md text-white p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Make a Difference Today!</h3>
                <p className="mb-6">
                  Your support brings hope and positive change to countless lives. Every donation takes us closer to making a lasting impact.
                </p>
              </div>
              <Link to='/allcamps' className="w-full">
                <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300 transform hover:scale-105">
                  Donate Now
                </button>
              </Link>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donorhome;
