import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API requests
import '../../Styling/MyCampaigns.css'; // Custom styles
import Orgnavbar from './Orgnavbar';

const Mycampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch campaigns by organization ID (this is an example; replace with actual org ID)
    const orgId = sessionStorage.getItem('orgId'); // Assuming org ID is saved in sessionStorage

    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`https://example.com/api/getcampaigns/${orgId}`);
        setCampaigns(response.data);
      } catch (err) {
        setError('Error fetching campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);


  return (
    <div className="dashboard-container">
      <Orgnavbar/>
      

      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card">
            <h2>Hello, {sessionStorage.getItem('userName')}</h2>
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
          <div className="campaigns-container">
      {campaigns.length === 0 ? (
        <p>No campaigns found from your organization.</p>
      ) : (
        campaigns.map((campaign) => (
          <div className="campaign-card" key={campaign.id}>
            <div className="card-image">
              <img
                src={`https://example.com/api/${campaign.id}/image`}
                alt={campaign.title}
                className="campaign-img"
              />
            </div>
            <div className="card-content">
              <h3 className="campaign-title">{campaign.title}</h3>
              <p className="campaign-description">{campaign.description}</p>
              <p className="campaign-category">Category: {campaign.category}</p>
              <p className="campaign-location">Location: {campaign.location}</p>
              <p className="campaign-dates">
                {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mycampaigns;
