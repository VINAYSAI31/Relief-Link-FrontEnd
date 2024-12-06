import React, { useEffect, useState } from 'react'
import Donornavbar from './Donornavbar'
import axios from 'axios';
import { User } from 'lucide-react';

const Myprofile = () => {

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

    return (
        <>
            <div className="dashboard-container">
                <Donornavbar />
                {/* Main Content */}
                <div className="main-content">
                    <div className="card-container">
                    <div >
      <Donornavbar />
      
      <main >
        {/* Top Bar */}
        <div className="top-card">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {user ? user.name : 'Loading...'}
            </h2> {/* Display user name with Tailwind CSS */}
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <i className="fas fa-search"></i>
            </div>
            <div className="bell-icon">
              <i className="fas fa-bell"></i>
            </div>
          </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl mb-8 mt-9">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                {user && user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              <div className="absolute -bottom-2 right-0 bg-green-500 p-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{user ? user.name : 'Loading...'}</h2>
              <p className="text-gray-600 mb-4">Active Donor since {new Date().getFullYear()}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user ? (
                  <>
                    <InfoItem label="Email" value={user.email} />
                    <InfoItem label="Contact" value={user.contact} />
                    <InfoItem label="Gender" value={user.gender} />
                    <InfoItem label="Location" value={user.location} />
                    <InfoItem label="Date of Birth" value={user.dateofbirth} />
                  </>
                ) : (
                  <>
                    <InfoItem label="Email" value="Loading..." />
                    <InfoItem label="Contact" value="Loading..." />
                    <InfoItem label="Gender" value="Loading..." />
                    <InfoItem label="Location" value="Loading..." />
                    <InfoItem label="Date of Birth" value="Loading..." />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        

        {/* Update Profile Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Update Profile
          </button>
        </div>
      </main>
    </div>

                    </div>
                </div>
            </div>
            
        </>
        
    )
};
const InfoItem = ({ label, value }) => (
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium text-gray-900">{value || 'Not provided'}</p>
    </div>
);

export default Myprofile;
