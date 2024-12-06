import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../Styling/Adminlogin.css";
import ProjectNavbar from "../ProjectNavbar";
import { Link, useNavigate } from "react-router-dom";
import Org_url from "../../Services/Organizationservice";
import { Mail, Key } from "lucide-react";

const Orglogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${Org_url}/checkorglogin`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        alert("Login Successful");
        navigate("/orghome"); // Redirect to OrgHome
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <ProjectNavbar />
      <div className="min-h-screen  flex items-center justify-center p-4 background-pattern-org">
        <div className="bg-white max-w-md w-full  backdrop-blur-lg rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-center mb-8">
            <Mail className="h-12 w-12 text-emerald-700" />
          </div>
          <h2 className="text-3xl font-bold text-center text-black mb-8">Organization Portal</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 h-5 w-5" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Your email"
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-12 text-black placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 h-5 w-5" />
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-12 text-black placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Log In
            </button>
            <div className="mt-4 text-center">
              <p className="text-emerald-500">Don't have an account?</p>
              <Link to="/orgreg" className="signup-link">
                Signup Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Orglogin;
