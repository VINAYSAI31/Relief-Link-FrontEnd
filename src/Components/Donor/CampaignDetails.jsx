import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../Styling/CampaignDetails.css';

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        // Fetch campaign details
        const response = await axios.get(`http://localhost:2024/org/api/campaigndetails/${id}`);
        setCampaign(response.data);

        // Fetch image
        const imageResponse = await axios.get(
          `http://localhost:2024/donor/api/getimagebyid/${id}`,
          { responseType: 'blob' }
        );
        const imageUrl = URL.createObjectURL(imageResponse.data);
        setImage(imageUrl);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch campaign details.');
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="campaign-details-container">
      <div className="campaign-header">
        <h1>{campaign.title}</h1>
        <img src={image || 'https://via.placeholder.com/300'} alt={campaign.title} className="campaign-image" />
      </div>
      <div className="campaign-details">
        <p className="campaign-description">{campaign.description}</p>
        <p><strong>Category:</strong> {campaign.category}</p>
        <p><strong>Location:</strong> {campaign.location}</p>
        <p><strong>Start Date:</strong> {new Date(campaign.startdate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(campaign.enddate).toLocaleDateString()}</p>
        <p><strong>Organizer:</strong> {campaign.organizer}</p>
        <p><strong>Contact:</strong> {campaign.contact}</p>
      </div>
    </div>
  );
};

export default CampaignDetails;
