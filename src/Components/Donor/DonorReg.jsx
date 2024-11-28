import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../Styling/Donorreg.css";
import ProjectNavbar from "../ProjectNavbar";
import { Link, useNavigate } from "react-router-dom";
import Donor_url from "../../Services/Donorservice";

const DonorReg = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
   const navigate=useNavigate();

  const onSubmit = async (data) => {
    try {
      
  
        const response = await axios.post(`${Donor_url}/donorregister`, data);
    
        if (response.status === 200) {
          console.log('registration Succesfull', response.data);
          
          navigate('/donorlogin');
          alert('Registration succesfull');
          // Redirect to Adminhome
        }
      } catch (error) {
        console.error('Error during Registration:', error.response?.data || error.message);
        alert('Registration failed');
      }
  };

  return (
    <>
      <ProjectNavbar />
      <div className="regbody">
        <div className="container">
          <div className="register-image"></div>
          <div className="register-container">
            <h2>Register as a Donor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <i>&#128100;</i>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.dname && <span>{errors.dname.message}</span>}
              </div>
              <div className="form-group">
                <i>&#128101;</i>
                <select {...register("gender", { required: "Gender is required" })}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.dgender && <span>{errors.dgender.message}</span>}
              </div>
              <div className="form-group">
                <i>&#128197;</i>
                <input
                  type="date"
                  {...register("dateofbirth", { required: "Date of birth is required" })}
                />
                {errors.ddob && <span>{errors.ddob.message}</span>}
              </div>
              <div className="form-group">
                <i>&#9993;</i>
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.demail && <span>{errors.demail.message}</span>}
              </div>
              <div className="form-group">
                <i>&#128274;</i>
                <input
                  type="password"
                  placeholder="Your Password"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.dpwd && <span>{errors.dpwd.message}</span>}
              </div>
              <div className="form-group">
                <i>&#127968;</i>
                <input
                  type="text"
                  placeholder="Your Address"
                  {...register("location", { required: "Address is required" })}
                />
                {errors.dlocation && <span>{errors.dlocation.message}</span>}
              </div>
              <div className="form-group">
                <i>&#128241;</i>
                <input
                  type="tel"
                  placeholder="Your Contact Number"
                  {...register("contact", { required: "Contact number is required" })}
                />
                {errors.dcontact && <span>{errors.dcontact.message}</span>}
              </div>
              <button type="submit" className="btn-register">
                Register
              </button>
            </form>
            <div className="link-container">
              <p>
                Already have an account? <Link to='/donorlogin'></Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorReg;
