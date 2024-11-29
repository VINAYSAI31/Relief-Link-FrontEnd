import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // For navigation
import '../../Styling/Donornavbar.css';

const Donornavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to control collapse/expand

  // Function to toggle the sidebar
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`donorbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="donorbar-logo">
        <img src="path/to/logo.png" alt="Organization Logo" />
      </div>

      {/* Toggle Button */}
      <button onClick={toggleNavbar} className="toggle-btn">
        <i className={`fas ${isCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
      </button>

      <div className={`welcome-text ${isCollapsed ? 'hidden' : ''}`}>
        Donor {/* Username from backend */}
      </div>

      <div className="donor-links">
        <Link to="/donorprofile">
          <i className="fas fa-user"></i> {!isCollapsed && "My Profile"}
        </Link>
        <Link to="#dashboard">
          <i className="fas fa-tachometer-alt"></i> {!isCollapsed && "Dashboard"}
        </Link>
        <Link to="/allcamps">
          <i className="fas fa-donate"></i> {!isCollapsed && "Make a Donation"}
        </Link>
        <Link to="#history">
          <i className="fas fa-history"></i> {!isCollapsed && "Donation History"}
        </Link>
        <Link to="#settings">
          <i className="fas fa-cog"></i> {!isCollapsed && "Settings"}
        </Link>
        <Link to="/">
          <i className="fas fa-sign-out-alt"></i> {!isCollapsed && "Logout"}
        </Link>
      </div>
    </div>
  );
};

export default Donornavbar;
