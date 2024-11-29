import React from "react";
import '../../Styling/Adminnavbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";



const AdminNavbar = () => {
  return (
   <>
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="path/to/logo.png" alt="Organization Logo" />
      </div>
      <div className="welcome-text">Admin</div>
      <div className="side-links">
       <Link to='/adminhome'> <i className="fa-solid fa-tachometer-alt"></i> <span>Dashboard</span></Link>
         
        
        <a href="/adminprofile">
          <i className="fa-solid fa-user"></i> <span>My Profile</span>
        </a>
        <Link to='/donors'>  <i className="fa-solid fa-users"></i> <span>Donors</span></Link>
        
      
        <a href="#organizations">
          <i className="fa-solid fa-building"></i> <span>Organizations</span>
        </a>
        <Link to='/admins'> <i className="fa-solid fa-user-plus"></i> <span>Admins</span></Link>
        <Link to='/campaigns'>
  <i className="fa-solid fa-bullhorn"></i> <span>Campaigns</span>
</Link>

       
        <a href="#settings">
          <i className="fa-solid fa-cog"></i> <span>Settings</span>
        </a>
        <a href="/">
          <i className="fa-solid fa-sign-out-alt"></i> <span>Logout</span>
        </a>
      </div>
    </div>
 
    </>
  );
};

export default AdminNavbar;
