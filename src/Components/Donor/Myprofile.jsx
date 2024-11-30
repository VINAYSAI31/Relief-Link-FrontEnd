import React, { useEffect, useState } from 'react'
import Donornavbar from './Donornavbar'
import axios from 'axios';

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
                        {/* Top Card */}
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

                        {/* Main Card */}
                        <div className="main-card">
                            <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
                                <div className="flex flex-col md:flex-row items-center md:items-start">
                                    {/* Profile Picture Section */}
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-300 flex items-center justify-center mb-6 md:mb-0">
                                        <span className="text-4xl text-white font-bold">{user ? user.name.charAt(0) : ''}</span>
                                    </div>

                                    {/* Donor Details Section */}
                                    <div className="ml-0 md:ml-6 w-full md:w-2/3">
                                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">My Profile</h1>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Name:</span>
                                                <span className="text-gray-800">{user ? user.name : 'Loading...'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Email:</span>
                                                <span className="text-gray-800">{user ? user.email : 'Loading...'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Contact:</span>
                                                <span className="text-gray-800">{user ? user.contact : 'Loading...'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Gender:</span>
                                                <span className="text-gray-800">{user ? user.gender : 'Loading...'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Location:</span>
                                                <span className="text-gray-800">{user ? user.location : 'Loading...'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700">Date of Birth:</span>
                                                <span className="text-gray-800">{user ? user.dateofbirth : 'Loading...'}</span>
                                            </div>
                                        </div>

                                        {/* Update Button */}
                                        <div className="mt-6">
                                            <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                                Update Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Donation History Section */}
                              

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Myprofile;
