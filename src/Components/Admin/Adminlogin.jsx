import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../Styling/Adminlogin.css';
import ProjectNavbar from '../ProjectNavbar';
import { useNavigate } from 'react-router-dom';
import Admin_url  from '../../Services/Adminservice';


const Adminlogin = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      
  
      const response = await axios.post(`${Admin_url}/checkadminlogin`, data);
  
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        
        navigate('/adminhome');
        alert('Login Successful');
        // Redirect to Adminhome
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };
  

  return (
    <>
      <ProjectNavbar />
      <div className="bodylogin">
        <div className="container">
          <div className="login-image"></div>
          <div className="login-container">
            <h2>Welcome Back Admin</h2>
            {/* Form for admin login */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <i>&#9993;</i>
                <input
                  type="text"
                  {...register('username', { required: 'Username is required' })}
                  placeholder="Your username"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminlogin;
