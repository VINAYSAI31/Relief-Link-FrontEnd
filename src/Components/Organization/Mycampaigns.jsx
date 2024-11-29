import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API requests
import '../../Styling/MyCampaigns.css'; // Custom styles
import Orgnavbar from './Orgnavbar';

const Mycampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null); // For editing

  useEffect(() => {
    const orgId = 1; // Assuming org ID is saved in sessionStorage

    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2024/org/api/getcampbyorgid/${orgId}`
        );

        if (Array.isArray(response.data)) {
          setCampaigns(response.data);
        } else if (Array.isArray(response.data.data)) {
          setCampaigns(response.data.data); // Check for nested data
        } else {
          setError('Error: Campaign data is not an array');
        }
      } catch (err) {
        console.error('Error fetching campaigns:', err); // Detailed error log
        setError('Error fetching campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Delete a campaign
  const deleteCampaign = async (id) => {
    try {
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

  return (
    <div className="dashboard-container">
      <Orgnavbar />

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
              {loading ? (
                <p>Loading campaigns...</p>
              ) : error ? (
                <p>{error}</p>
              ) : campaigns.length === 0 ? (
                <p>No campaigns found from your organization.</p>
              ) : (
                campaigns.map((campaign) => (
                  <div className="campaign-card" key={campaign.id}>
                    <div className="card-image">
                      {campaign.imagedata ? (
                        <img
                          src={`data:${campaign.imagetype};base64,${campaign.imagedata}`}
                          alt={campaign.title}
                          className="campaign-img"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                    <div className="card-content">
                      <h3 className="campaign-title">{campaign.title}</h3>
                      <p className="campaign-description">{campaign.description}</p>
                      <p className="campaign-category">Category: {campaign.category}</p>
                      <p className="campaign-location">Location: {campaign.location}</p>
                      <p className="campaign-dates">
                        {new Date(campaign.startdate).toLocaleDateString()} -{' '}
                        {new Date(campaign.enddate).toLocaleDateString()}
                      </p>
                      <button onClick={() => deleteCampaign(campaign.id)}>Delete</button>
                      <button onClick={() => handleEdit(campaign)}>Edit</button>
                    </div>
                  </div>
                ))
              )}
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
                setSelectedCampaign({
                  ...selectedCampaign,
                  targetAmount: e.target.value,
                })
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
    </div>
  );
};

export default Mycampaigns;
