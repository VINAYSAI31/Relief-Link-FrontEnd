import React from 'react';
import '../Styling/Projecthome.css'
import ProjectNavbar from './ProjectNavbar';
import { Link } from 'react-router-dom';

const Projecthome = () => {
  return (
    <>
      <ProjectNavbar/>      {/* Include your Navbar component here */}
      
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Make a Difference Today</h1>
          <p>Your generous contribution can bring hope and change lives. Join us in our mission to create a better world.</p>
          <div className="cta-buttons">
            <a href="/Donorlogin" className="cta-btn primary-btn">Donate Now</a>
       
            <Link to='/orglogin' className="cta-btn secondary-btn">Join our Community</Link>
          </div>
        </div>
      </header>

      {/* Donation Process Section */}
      <section className="donation-process">
        <h2>Donation Process</h2>
        <p>The donation process from the time you arrive at the center until the time you leave</p>
        <div className="steps">
          <div className="step">
            <img src="registration.jpg" alt="Registration Step" />
            <h3>Registration</h3>
            <p>
              You need to complete a very simple registration form, which contains all required contact information to enter in the donation process.
            </p>
          </div>
          <div className="step">
            <img src="screening.jpg" alt="Screening Step" />
            <h3>Screening</h3>
            <p>
              A drop of blood from your finger will take for a simple test to ensure that your blood iron levels are proper enough for the donation process.
            </p>
          </div>
          <div className="step">
            <img src="donation.jpg" alt="Donation Step" />
            <h3>Donation</h3>
            <p>
              After ensuring and passing the screening test successfully, you will be directed to a donor bed for donation. It will take only 6-10 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Decorative Section */}
      <section className="decorative-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create sustainable change through impactful initiatives. Every dollar donated goes directly to helping communities in need. Your support fuels our efforts to bring hope, health, and happiness to those who need it most.
        </p>
        <p>
          <Link to= "/orglogin" className="cta-btn primary-btn">Support Our Mission</Link>
        </p>
      </section>

      {/* Footer */}
      {/* Include your Footer component here */}
    </>
  );
};

export default Projecthome;
