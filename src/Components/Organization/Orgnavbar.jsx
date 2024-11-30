import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // For navigation
import '../../Styling/Orgnavbar.css'
import axios from 'axios';

const Orgnavbar = () => {
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      // Send logout request to backend to invalidate the session
      const response = await axios.post('http://localhost:2024/org/api/logout', {}, { withCredentials: true });
  
      // Check if logout was successful (based on backend response)
      if (response.status === 200) {
        alert('Logout successful');
        // Clear any client-side stored session data (localStorage, sessionStorage, cookies)
        localStorage.removeItem('token'); // if using localStorage
        sessionStorage.removeItem('token'); // if using sessionStorage
        // Optionally clear any auth-related states or context here
        // redirect to the login page
        navigate('/orglogin');
      } else {
        alert('Logout failed, please try again');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred during logout. Please try again later.');
    }
  };

  return (
    <div className="orgbar">
      <div className="orgbar-logo">
        <img src="path/to/logo.png" alt="Organization Logo" />
      </div>
      <div className="welcome-text">
        org {/* Username from backend */}
      </div>
      <div className="org-links">
        <Link to="/orgprofile" >
          <i className="fas fa-user"></i> ORG Profile
        </Link>
        <Link to="#dashboard" >
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </Link> 
        <Link to="/mycampaigns" >
        <i className="fas fa-hand-holding-heart"></i> My Campaings
        </Link>
        <Link to="/addcampaign" className="orgbar-link">
    <i className="fas fa-hands-helping"></i> Add Campaign
  </Link>
        <Link to="#history" >
        <i className="fas fa-chart-line"></i> Reports
        </Link>
        <Link to="/orgmembers">
          <i className="fas fa-users"></i> Team Members
        </Link>
        <Link to="#settings" >
          <i className="fas fa-cog"></i> Settings
        </Link>
        <Link to="/" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </Link>
      </div>
    </div>
  );
};

export default Orgnavbar;
