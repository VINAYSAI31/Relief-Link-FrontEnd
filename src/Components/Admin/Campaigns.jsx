import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './Adminnavbar';
import '../../Styling/Campaigns.css';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null); // For storing selected campaign for edit

  // Fetch all campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:2024/donor/api/getallcamps');
        setCampaigns(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Delete a campaign
  const deleteCampaign = async (id) => {
    try {
      console.log('Deleting campaign with ID:', id);
      await axios.delete(`http://localhost:2024/org/api/deletecamp/${id}`);
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id)); // Update local state
      alert('Campaign deleted successfully!');
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  // Handle selecting campaign for edit
  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign); // Set the selected campaign for editing
  };

  // Handle updating campaign details
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:2024/org/api/updatecamp/${selectedCampaign.id}`,
        selectedCampaign
      );

      setCampaigns(
        campaigns.map((campaign) =>
          campaign.id === selectedCampaign.id ? selectedCampaign : campaign
        )
      );

      alert('Campaign updated successfully!');
      setSelectedCampaign(null); // Close the popup form
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  // Fetch an image for a campaign
  const getImageUrl = (id) => `http://localhost:2024/donor/api/getimagebyid/${id}`;

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <>
      <AdminNavbar />
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card">
            <h2>Hello Admin</h2>
            <div className="top-actions">
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <i className="fas fa-search"></i>
              </div>
              <div className="bell-icon">
                <i className="fas fa-bell"></i>
              </div>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div className="main-card">
            <div>
              <h1>Campaigns</h1>
              <div className="campaigns-list">
                {campaigns.length === 0 ? (
                  <p>No campaigns found</p>
                ) : (
                  campaigns.map((campaign) => (
                    <div key={campaign.id} className="campaign-card">
                      <img src={getImageUrl(campaign.id)} alt={campaign.title} />
                      <h3>{campaign.title}</h3>
                      {/*      */}
                      <button onClick={() => deleteCampaign(campaign.id)}>Delete</button>
                      <button onClick={() => handleEdit(campaign)}>Edit</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Popup */}
      {selectedCampaign && (
        <div className="popup-form">
          <div className="form-container">
            <h3>Edit Campaign Details</h3>
            <label>Campaign Name:</label>
            <input
              type="text"
              value={selectedCampaign.title}
              onChange={(e) =>
                setSelectedCampaign({ ...selectedCampaign, title: e.target.value })
              }
            />
            <label>Description:</label>
            <textarea
              value={selectedCampaign.description}
              onChange={(e) =>
                setSelectedCampaign({ ...selectedCampaign, description: e.target.value })
              }
            ></textarea>
            <label>Start Date:</label>
            <input
              type="date"
              value={selectedCampaign.startdate}
              onChange={(e) =>
                setSelectedCampaign({ ...selectedCampaign, startdate: e.target.value })
              }
            />
            <label>End Date:</label>
            <input
              type="date"
              value={selectedCampaign.enddate}
              onChange={(e) =>
                setSelectedCampaign({ ...selectedCampaign, enddate: e.target.value })
              }
            />
            <label>Target Amount:</label>
            <input
              type="number"
              value={selectedCampaign.targetAmount}
              onChange={(e) =>
                setSelectedCampaign({ ...selectedCampaign, targetAmount: e.target.value })
              }
            />
            <label>Status:</label>
            <select
              value={selectedCampaign.status}
              onChange={(e) =>
                setSelectedCampaign({ ...selectedCampaign, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button onClick={handleUpdate} style={{ marginRight: '10px' }}>
              Update
            </button>
            <button onClick={() => setSelectedCampaign(null)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Campaigns;
