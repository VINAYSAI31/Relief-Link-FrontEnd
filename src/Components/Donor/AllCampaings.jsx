import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styling/AllCampaings.css';
import Donornavbar from './Donornavbar';

const AllCampaings = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null); // For modal content
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [images, setImages] = useState({}); // Store campaign images

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:2024/donor/api/getallcamps');
        const campData = response.data;

        setCampaigns(campData);

        // Fetch images for each campaign
        const imagePromises = campData.map(async (campaign) => {
          try {
            const imageResponse = await axios.get(
              `http://localhost:2024/donor/api/getimagebyid/${campaign.id}`,
              { responseType: 'blob' }
            );
            const imageUrl = URL.createObjectURL(imageResponse.data);
            setImages((prevImages) => ({ ...prevImages, [campaign.id]: imageUrl }));
          } catch {
            setImages((prevImages) => ({ ...prevImages, [campaign.id]: null }));
          }
        });

        await Promise.all(imagePromises);
      } catch (err) {
        setError('Error fetching campaigns and images.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Fetch detailed information when a campaign is selected
  const fetchCampaignDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:2024/org/api/campaigndetails/${id}`);
      const imageResponse = await axios.get(
        `http://localhost:2024/donor/api/getimagebyid/${id}`,
        { responseType: 'blob' }
      );
      const imageUrl = URL.createObjectURL(imageResponse.data);
      setSelectedCampaign({ ...response.data, imageUrl });
    } catch {
      setError('Error fetching campaign details.');
    }
  };

  const closeModal = () => setSelectedCampaign(null); // Close modal

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-container">
      <Donornavbar/>
      

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

            
      {/* Main Content */}
      <div >
        <div className="campaigns-container">
          {campaigns.length === 0 ? (
            <p>No campaigns available.</p>
          ) : (
            campaigns.map((campaign) => (
              <div className="campaign-card" key={campaign.id}>
                <div className="card-image">
                  <img
                    src={images[campaign.id] || 'https://via.placeholder.com/150'}
                    alt={campaign.title}
                    className="campaign-img"
                  />
                </div>
                <div className="card-content">
                  <h3 className="campaign-title">{campaign.title}</h3>
                  <p className="campaign-description">{campaign.description}</p>
                  <button
                    className="read-more-button"
                    onClick={() => fetchCampaignDetails(campaign.id)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for campaign details */}
      {selectedCampaign && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h1>{selectedCampaign.title}</h1>
            <img
              src={selectedCampaign.imageUrl || 'https://via.placeholder.com/300'}
              alt={selectedCampaign.title}
              className="modal-image"
            />
            <p>{selectedCampaign.description}</p>
            <p><strong>Category:</strong> {selectedCampaign.category}</p>
            <p><strong>Location:</strong> {selectedCampaign.location}</p>
            <p><strong>Start Date:</strong> {new Date(selectedCampaign.startdate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedCampaign.enddate).toLocaleDateString()}</p>
            <p><strong>Organizer:</strong> {selectedCampaign.organizer}</p>
            <p><strong>Contact:</strong> {selectedCampaign.contact}</p>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    
  );
};

export default AllCampaings;
