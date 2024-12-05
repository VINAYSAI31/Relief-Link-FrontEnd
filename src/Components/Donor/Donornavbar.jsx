import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // For navigation
import '../../Styling/Donornavbar.css';
import axios from 'axios';

const Donornavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to control collapse/expand
  const navigate=useNavigate();
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

  // Function to toggle the sidebar
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = async () => {
    try {
      // Send logout request to backend to invalidate the session
      const response = await axios.post('http://localhost:2024/donor/api/logout', {}, { withCredentials: true });
  
      // Check if logout was successful (based on backend response)
      if (response.status === 200) {
        alert('Logout successful');
        // Clear any client-side stored session data (localStorage, sessionStorage, cookies)
        localStorage.removeItem('token'); // if using localStorage
        sessionStorage.removeItem('token'); // if using sessionStorage
        // Optionally clear any auth-related states or context here
        // redirect to the login page
        navigate('/donorlogin');
      } else {
        alert('Logout failed, please try again');
      }
    } catch (error) {
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
        DONOR 
      </div>

      <div className="donor-links">
        <Link to="/myprofile">
          <i className="fas fa-user"></i> {!isCollapsed && "My Profile"}
        </Link>
        <Link to="/donorhome">
          <i className="fas fa-home"></i> {!isCollapsed && "Home"}
        </Link>
        <Link to="/mydashboard">
          <i className="fas fa-tachometer-alt"></i> {!isCollapsed && "Dashboard"}
        </Link>
        <Link to="/allcamps">
          <i className="fas fa-donate"></i> {!isCollapsed && "Make a Donation"}
        </Link>
        <Link to="/donationhistory">
          <i className="fas fa-history"></i> {!isCollapsed && "Donation History"}
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

export default Donornavbar;
