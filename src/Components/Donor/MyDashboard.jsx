import React, { useEffect, useState } from 'react';
import Donornavbar from './Donornavbar';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const MyDashBoard = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [campaigns, setCampaigns] = useState({});
  const [averageDonation, setAverageDonation] = useState(0);
  const [mostDonatedCampaign, setMostDonatedCampaign] = useState(null);
  const [recentDonation, setRecentDonation] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:2024/donor/api/getLoggedInDonor", {
        withCredentials: true,
      })
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        if (userData && userData.name) {
          axios
            .get(`http://localhost:2024/api/donation/donor/${userData.name}`)
            .then((donationResponse) => {
              console.log(donationResponse);
              const data = donationResponse.data;
              setDonations(data);

              const total = data.reduce((sum, donation) => sum + donation.amount, 0);
              setTotalDonations(total);

              const avgDonation = data.length > 0 ? total / data.length : 0;
              setAverageDonation(avgDonation);

              const campaignStats = {};
              data.forEach((donation) => {
                const campaign = donation.campaignName;
                const amount = donation.amount;
                if (campaignStats[campaign]) {
                  campaignStats[campaign] += amount;
                } else {
                  campaignStats[campaign] = amount;
                }
              });

              setCampaigns(campaignStats);

              const mostDonated = Object.keys(campaignStats).reduce((a, b) =>
                campaignStats[a] > campaignStats[b] ? a : b
              );
              setMostDonatedCampaign(mostDonated);

              const latestDonation = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
              setRecentDonation(latestDonation);
            })
            .catch((donationError) => {
              console.error("Error fetching donations:", donationError);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const lineChartData = {
    labels: donations.map((donation) => new Date(donation.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'Donations Over Time',
        data: donations.map((donation) => donation.amount),
        borderColor: '#4CAF50',
        fill: false,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(campaigns),
    datasets: [
      {
        label: 'Total Donations per Campaign',
        data: Object.values(campaigns),
        backgroundColor: '#2196F3',
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(campaigns),
    datasets: [
      {
        data: Object.values(campaigns),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <Donornavbar />
      <div className="main-content">
        <div className="card-container">
          <div className="top-card">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {user ? user.name : 'Loading...'}
            </h2>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <i className="fas fa-search"></i>
            </div>
            <div className="bell-icon">
              <i className="fas fa-bell"></i>
            </div>
          </div>

          <div className="main-card">
            <div style={{ padding: '20px' }}>
              <h1>Donation Dashboard</h1>

              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <h2>Total Donations</h2>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{totalDonations.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                </div>
                <div style={{ textAlign: 'center',  padding: '10px', borderRadius: '8px' }}>
                  <h2>Average Donation</h2>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{averageDonation.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                </div>
                <div style={{ textAlign: 'center', padding: '10px', borderRadius: '8px', color: '#FFF' }}>
                  <h2>Most Donated Campaign</h2>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{mostDonatedCampaign}</p>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h2>Analysis & Insights</h2>
                <p>Most Donated Campaign: <strong>{mostDonatedCampaign}</strong></p>
                <p>Recent Donation: ₹{recentDonation?.amount} to {recentDonation?.campaignName} on {recentDonation ? new Date(recentDonation.timestamp).toLocaleString() : 'N/A'}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <div style={{ width: '45%' }}>
                  <Line data={lineChartData} options={{ responsive: true }} />
                </div>
                <div style={{ width: '45%' }}>
                  <Bar data={barChartData} options={{ responsive: true }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '30%' }}>
                  <Pie data={pieChartData} options={{ responsive: true }} />
                </div>
              </div>

              <div style={{ marginTop: '40px', backgroundColor: '#F0F8FF', padding: '20px', borderRadius: '10px' }}>
                <h2>AI Recommendations</h2>
                <ul>
                  <li>
                    <p><strong>Personalized Suggestions:</strong> Based on your history, campaigns like <strong>{mostDonatedCampaign}</strong> resonate with your values. Consider exploring similar causes.</p>
                  </li>
                  <li>
                    <p><strong>Donation Trend Analysis:</strong> Your donation patterns indicate a consistent preference for campaigns focusing on community welfare.</p>
                  </li>
                  <li>
                    <p><strong>Impact Forecast:</strong> A ₹500 increase in your average donation could significantly enhance outcomes for your favorite campaigns.</p>
                  </li>
                </ul>
                <p>Stay tuned for more features like predictive analytics and social impact visualization!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashBoard;