import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Donornavbar from './Donornavbar';

const AllCampaings = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:2024/donor/api/getallcamps');
        const activeCampaigns = response.data.filter((campaign) => campaign.status === 'Active');
        setCampaigns(activeCampaigns);

        // Fetch images
        const imagePromises = activeCampaigns.map(async (campaign) => {
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
        setError('Error fetching campaigns.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

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
  const groupCampaignsByCategory = (campaigns) => {
    return campaigns.reduce((acc, campaign) => {
      const category = campaign.category || "Uncategorized";  // Use the category from the campaign object, or "Uncategorized"
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(campaign);
      return acc;
    }, {});
  };
  
  const closeModal = () => setSelectedCampaign(null);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="dashboard-container">
      <Donornavbar/>
      

      {/* Main Content */}
      <div className="main-content">
      <div className="card-container">
  {/* Top Section */}
  <div className="top-card flex items-center justify-between p-4 bg-blue-600 text-white">
    <h2>Hello, {sessionStorage.getItem('userName')}</h2>
    <div className="flex items-center space-x-4">
      <div className="search-bar relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-full text-gray-800 focus:outline-none"
        />
        <i className="fas fa-search absolute right-4 top-3 text-gray-400"></i>
      </div>
      <div className="bell-icon">
        <i className="fas fa-bell text-xl"></i>
      </div>
    </div>
  </div>

  {/* Main Content Section */}
  <div className="main-card min-h-screen bg-gray-100">
  <div className="p-10 max-w-7xl mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-semibold text-gray-800">Active Campaigns</h1>
      <p className="text-gray-500">Browse through ongoing initiatives and find ways to contribute.</p>
    </div>

    {/* Campaign List */}
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {campaigns.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">No active campaigns available.</p>
      ) : (
        campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-200 flex"
          >
            {/* Image */}
            <img
              src={images[campaign.id] || 'https://via.placeholder.com/150'}
              alt={campaign.title}
              className="w-48 h-48 object-cover"
            />

            {/* Campaign Details */}
            <div className="p-4 flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{campaign.title}</h2>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-building text-blue-500"></i>
                  <span>{campaign.organizer}</span>
                </div>
                <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1">
  <i className="fas fa-calendar-alt text-green-500"></i>
  <span>{new Date(campaign.startdate).toLocaleDateString()}</span>

  {/* Add a dash or any symbol between the dates */}
  <span className="text-gray-600">–</span>

  <i className="fas fa-calendar-check text-red-500"></i>
  <span>{new Date(campaign.enddate).toLocaleDateString()}</span>
</span>

                  
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-yellow-500"></i>
                  <span>{campaign.location}</span>
                </div>
              </div>
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
</div>


  {/* Modal for Selected Campaign */}
  {selectedCampaign && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
      {/* Image Section */}
      <div className="relative">
        <img
          src={selectedCampaign.imageUrl || 'https://via.placeholder.com/400x600'}
          alt={selectedCampaign.title}
          className="w-auto h-auto object-cover"
        />
        <button
          className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-3 hover:bg-gray-900"
          onClick={closeModal}
        >
          &times;
        </button>
      </div>

      {/* Modal Content with Scroll */}
      <div className="p-8 h-[400px]">
  {/* Title and Description */}
  <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedCampaign.title}</h2>
  <p className="text-lg text-gray-600 mb-6">
    {selectedCampaign.description}
    {/* Contribution Type and Items integrated into the description */}
    <div className="mt-4">
      <i className={`fas ${selectedCampaign.contributiontype === 'money' ? 'fa-dollar-sign' : 'fa-cogs'} text-blue-500`}></i>
      <span className="font-semibold ml-2">
        {selectedCampaign.contributiontype === 'money' ? 'Target Amount:' : 'Items Needed:'}
      </span>
      <span className="text-gray-600 ml-2">
        {selectedCampaign.contributiontype === 'money'
          ? `$${selectedCampaign.required}`
          : selectedCampaign.required}
      </span>
    </div>
  </p>

  {/* Campaign Info */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-700">
    <div className="flex items-center space-x-3">
      <i className="fas fa-calendar-day text-blue-500"></i>
      <span><strong>Start Date:</strong> {new Date(selectedCampaign.startdate).toLocaleDateString()}</span>
    </div>
    <div className="flex items-center space-x-3">
      <i className="fas fa-calendar-check text-blue-500"></i>
      <span><strong>End Date:</strong> {new Date(selectedCampaign.enddate).toLocaleDateString()}</span>
    </div>
    <div className="flex items-center space-x-3">
      <i className="fas fa-tag text-blue-500"></i>
      <span><strong>Category:</strong> {selectedCampaign.category}</span>
    </div>
    <div className="flex items-center space-x-3">
      <i className="fas fa-map-marker-alt text-blue-500"></i>
      <span><strong>Location:</strong> {selectedCampaign.location}</span>
    </div>
    <div className="flex items-center space-x-3">
      <i className="fas fa-user-friends text-blue-500"></i>
      <span><strong>Organizer:</strong> {selectedCampaign.organizer}</span>
    </div>
    <div className="flex items-center space-x-3">
      <i className="fas fa-phone-alt text-blue-500"></i>
      <span><strong>Contact:</strong> {selectedCampaign.contact}</span>
    </div>
  </div>
</div>

      {/* Donate Now Button */}
      <div className="p-8 text-center bg-gray-100">
        <button
          className="px-10 py-4 bg-green-600 text-white text-xl font-semibold rounded-full hover:bg-green-700 transition duration-200"
        >
          Donate Now
        </button>
      </div>
    </div>
  </div>
)}



</div>

      </div>
    </div>
  );
};

export default AllCampaings;
