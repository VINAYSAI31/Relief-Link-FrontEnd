import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // For navigation
import '../../Styling/Donornavbar.css';


const LogisticsNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to control collapse/expand
  const navigate=useNavigate();



  // Function to toggle the sidebar
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = async () => {
    try {
   
        navigate('/donorlogin');
      } 
    catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred during logout. Please try again later.');
    }
  };
  

  return (
    <div className={`donorbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="donorbar-logo">
        <img src="path/to/logo.png" alt=" Logo" />
      </div>

      {/* Toggle Button */}
      <button onClick={toggleNavbar} className="toggle-btn">
        <i className={`fas ${isCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
      </button>

      <div className={`welcome-text ${isCollapsed ? 'hidden' : ''}`}>
        Logistics 
      </div>

      <div className="donor-links">
      <Link to="/home">
          <i className="fas fa-home"></i> {!isCollapsed && "Home"}
        </Link>
        <Link to="/assigned-deliveries">
          <i className="fas fa-truck"></i> {!isCollapsed && "Assigned Deliveries"}
        </Link>
        <Link to="/deadlines">
          <i className="fas fa-calendar-check"></i> {!isCollapsed && "Deadlines"}
        </Link>
        <Link to="/issues">
          <i className="fas fa-exclamation-circle"></i> {!isCollapsed && "Issues"}
        </Link>
        <Link to="/dashboard">
          <i className="fas fa-tachometer-alt"></i> {!isCollapsed && "Dashboard"}
        </Link>
        <Link to="#settings">
          <i className="fas fa-cog"></i> {!isCollapsed && "Settings"}
        </Link>
        <Link to="/" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> {!isCollapsed && "Logout"}
        </Link>
      </div>
    </div>
  );
};

export default LogisticsNavbar;
