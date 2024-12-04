import React, { useEffect, useState } from 'react';
import Donornavbar from './Donornavbar';
import axios from 'axios';

const DonationHistory = () => {
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);

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

    useEffect(() => {
      if (user) { // Ensure user is not null before making the API call
        fetch(`http://localhost:2024/api/donation/donor/${user.name}`)
          .then(response => response.json())
          .then(data => {
            setDonations(data);
          })
          .catch(error => console.error('Error fetching donation data:', error));
      }
    }, [user]); // Dependency array ensures this runs after `user` is set

    if (!user) {
      return <div>Loading...</div>; // Display loading until `user` is fetched
    }

    return (
      <div className="dashboard-container">
        <Donornavbar />
        {/* Main Content */}
        <div className="main-content">
          <div className="card-container">
            {/* Top Card */}
            <div className="top-card">
              <h2 className="text-xl font-semibold text-gray-800">
                Welcome, {user.name}
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
              <div>
                <h1 className="text-2xl font-bold mb-4">Donation History</h1>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border-b text-left">Campaign Name</th>
                        <th className="px-4 py-2 border-b text-left">Amount</th>
                        <th className="px-4 py-2 border-b text-left">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.length > 0 ? (
                        donations.map((donation, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 border-b">{donation.campaignName}</td>
                            <td className="px-4 py-2 border-b">₹{donation.amount.toFixed(2)}</td>
                            <td className="px-4 py-2 border-b">{new Date(donation.timestamp).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-2 border-b text-center">No donation records found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DonationHistory;
