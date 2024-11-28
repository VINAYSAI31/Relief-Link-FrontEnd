import React from "react";
import "../Styling/Projectnavbar.css";

const ProjectNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">Relief Link</a>
      </div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className="auth-buttons">
      <a href="/register" className="signup-btn">Sign Up</a>
        <a href="/Adminlogin" className="login-btn">Admin</a>
        
      </div>
    </nav>
  );
};

export default ProjectNavbar;
