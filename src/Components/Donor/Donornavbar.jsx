import React from 'react';
import { Link } from 'react-router-dom';  // For navigation
import '../../Styling/Donornavbar.css'

const Donornavbar = () => {
  return (
    <div className="donorbar">
      <div className="donorbar-logo">
        <img src="path/to/logo.png" alt="Organization Logo" />
      </div>
      <div className="welcome-text">
        Donor {/* Username from backend */}
      </div>
      <div className="donor-links">
        <Link to="/donorprofile" >
          <i className="fas fa-user"></i> My Profile
        </Link>
        <Link to="#dashboard" >
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </Link> 
        <Link to="#donate" >
          <i className="fas fa-donate"></i> Make a Donation
        </Link>
        <Link to="#history" >
          <i className="fas fa-history"></i> Donation History
        </Link>
        <Link to="#settings" >
          <i className="fas fa-cog"></i> Settings
        </Link>
        <Link to="/" >
          <i className="fas fa-sign-out-alt"></i> Logout
        </Link>
      </div>
    </div>
  );
};

export default Donornavbar;
