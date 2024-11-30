import React, { useEffect, useState } from 'react';
import Donornavbar from './Donornavbar';
import axios from 'axios';

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
          <div className="main-card">
            <h2>Welcome to your personalized dashboard</h2>
            <p>
              Here, you can manage your profile, view your donation history, and make new contributions to our mission.
            </p>
            <button className="button-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donorhome;
