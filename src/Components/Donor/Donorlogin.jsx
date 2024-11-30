import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../Styling/Adminlogin.css";
import ProjectNavbar from "../ProjectNavbar";
import { Link, useNavigate } from "react-router-dom";

const Donorlogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      console.log("Form data submitted:", data);
      const response = await axios.post(
        "http://localhost:2024/donor/api/checkdonorlogin",
        data, { withCredentials: true, }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        alert("Login Successful");
        navigate("/donorhome"); // Redirect to donor home page
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        alert(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        alert("Unable to connect to server. Please try again later.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <ProjectNavbar />
      <div className="bodylogin">
        <div className="container">
          <div className="login-image"></div>
          <div className="login-container">
            <h2>Welcome Back Donor</h2>
            {/* Form for donor login */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <i>&#9993;</i>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Your email"
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>
              <div className="form-group">
                <i>&#128274;</i>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}
              </div>
              <button type="submit" className="btn-login">
                Log In
              </button>
              <div className="signup-link">
                <p>
                  Don't have an account? <Link to="/donorreg">Signup Now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donorlogin;
