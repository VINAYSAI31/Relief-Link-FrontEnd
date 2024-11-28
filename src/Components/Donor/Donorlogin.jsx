import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../Styling/Adminlogin.css'
import ProjectNavbar from '../ProjectNavbar';
import { Link, useNavigate } from 'react-router-dom';




const Donorlogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate=useNavigate();
  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      
  
      const response = await axios.post('http://localhost:2024/donor/api/checkdonorlogin', data);
  
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        
        alert('Login Successful');
        navigate('/donorhome');
        // Redirect to Adminhome
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };;
  

  return (
    <>
      <ProjectNavbar />
      <div className="bodylogin">
        <div className="container">
          <div className="login-image"></div>
          <div className="login-container">
            <h2>Welcome Back Donor</h2>
            {/* Form for admin login */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <i>&#9993;</i>
                <input
                  type="email"
                  {...register('email', { required: 'email is required' })}
                  placeholder="Your email"
                />
                {errors.ausername && <span className="error">{errors.ausername.message}</span>}
              </div>
              <div className="form-group">
                <i>&#128274;</i>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  placeholder="Password"
                />
                {errors.apwd && <span className="error">{errors.apwd.message}</span>}
              </div>
              <button type="submit" className="btn-login">
                Log In
              </button>
              <div class="signup-link">
        <p>Don't have an account? <Link to='/donorreg'>Signup Now</Link></p>
    </div> 
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donorlogin;
