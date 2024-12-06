import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Mail, Key } from "lucide-react"; // Assuming lucide-react is used for icons
import "../../Styling/Donorlogin.css";
import ProjectNavbar from "../ProjectNavbar";
import { Link, useNavigate } from "react-router-dom";

const Donorlogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Form data submitted:", data);
      const response = await axios.post(
        "http://localhost:2024/donor/api/checkdonorlogin",
        data, { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        alert("Login Successful");
        navigate("/donorhome");
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
      <div className="min-h-screen flex items-center justify-center p-4 background-pattern">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-center mb-8">
            <Mail className="h-12 w-12 text-rose-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back Donor</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 h-5 w-5" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Your email"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 h-5 w-5" />
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Log In
            </button>
            <div className="mt-6 text-center">
              <p className="text-gray-600">Don't have an account?</p>
              <Link to="/donorreg" className="text-rose-500 hover:text-rose-600 font-medium">
                Signup Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Donorlogin;
