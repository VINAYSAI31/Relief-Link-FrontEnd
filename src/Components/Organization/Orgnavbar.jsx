import React from 'react';
import { Link } from 'react-router-dom';  // For navigation
import '../../Styling/Orgnavbar.css'

const Orgnavbar = () => {
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
        <Link to="#donate" >
        <i className="fas fa-hand-holding-heart"></i> Manage Donations
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
        <Link to="/" >
          <i className="fas fa-sign-out-alt"></i> Logout
        </Link>
      </div>
    </div>
  );
};

export default Orgnavbar;
