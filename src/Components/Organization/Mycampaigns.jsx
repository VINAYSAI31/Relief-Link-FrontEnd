import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styling/MyCampaigns.css';
import Orgnavbar from './Orgnavbar';

const Mycampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [org, setOrg] = useState(null);

  useEffect(() => {
    // Fetch the logged-in organization's details from the backend
    axios
      .get("http://localhost:2024/org/api/getLoggedInorg", {
        withCredentials: true, // Sends the session cookie
      })
      .then((response) => {
        console.log("Fetched organization data:", response.data);
        setOrg(response.data);
      })
      .catch((error) => {
        console.error("Error fetching org details:", error);
        setError('Failed to load organization details.');
      });
  }, []);

  useEffect(() => {
    if (org && org.id !== undefined) {
      if (!campaigns.length) {
        console.log('Logged-in Organization ID:', org.id);
        setLoading(true);
  
        const fetchCampaigns = async () => {
          try {
            const response = await axios.get(`http://localhost:2024/org/api/getcampbyorgid/${org.id}`);
            if (response && response.data) {
              console.log('Fetched campaigns:', response.data);
              setCampaigns(response.data);
            } else {
              console.error('Response data is not defined:', response);
              setError('Failed to fetch campaigns.');
            }
          } catch (error) {
            console.error('Error fetching campaigns:', error);
            setError('An error occurred while fetching campaigns.');
          } finally {
            setLoading(false);
          }
        };
  
        fetchCampaigns();
      } else {
        console.log('Campaigns already fetched');
      }
    } else {
      console.log('Organization ID is not defined or org is null');
      setLoading(false);
    }
  }, [org]); // Runs when `org` changes
  

  // Delete a campaign
  const deleteCampaign = async (id) => {
    try {
      await axios.delete(`http://localhost:2024/org/api/deletecamp/${id}`);
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
      alert('Campaign deleted successfully!');
    } catch (error) {
      console.error('Error deleting campaign:', error);
      setError('Failed to delete campaign.');
    }
  };

  // Handle selecting a campaign for editing
  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
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
      setSelectedCampaign(null);
    } catch (error) {
      console.error('Error updating campaign:', error);
      setError('Failed to update campaign.');
    }
  };

  return (
    <div className="dashboard-container">
      <Orgnavbar />
      <div className="main-content">
        <div className="card-container">
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

          <div className="bg-gray-50 p-4 rounded-lg">
            {loading ? (
              <p className="text-center text-gray-500">Loading campaigns...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : campaigns.length === 0 ? (
              <p className="text-center text-gray-500">No campaigns found from your organization.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div className="bg-white shadow-md rounded-lg p-4" key={campaign.id}>
                    <div className="mb-4">
                      {campaign.imagedata ? (
                        <img
                          src={`data:${campaign.imagetype};base64,${campaign.imagedata}`}
                          alt={campaign.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      ) : (
                        <div className="text-center text-gray-500">No image available</div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{campaign.title}</h3>
                    <p className="text-gray-600">Category: {campaign.category}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => deleteCampaign(campaign.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(campaign)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedCampaign && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Campaign Details</h3>
            <label className="block text-gray-600 mb-2">Campaign Name:</label>
            <input
              type="text"
              value={selectedCampaign.title}
              onChange={(e) => setSelectedCampaign({ ...selectedCampaign, title: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
            <label className="block text-gray-600 mb-2">Description:</label>
            <textarea
              value={selectedCampaign.description}
              onChange={(e) => setSelectedCampaign({ ...selectedCampaign, description: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            ></textarea>
            <label className="block text-gray-600 mb-2">Start Date:</label>
            <input
              type="date"
              value={selectedCampaign.startdate}
              onChange={(e) => setSelectedCampaign({ ...selectedCampaign, startdate: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
            <label className="block text-gray-600 mb-2">End Date:</label>
            <input
              type="date"
              value={selectedCampaign.enddate}
              onChange={(e) => setSelectedCampaign({ ...selectedCampaign, enddate: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
            <label className="block text-gray-600 mb-2">Target Amount:</label>
            <input
              type="number"
              value={selectedCampaign.targetAmount}
              onChange={(e) => setSelectedCampaign({ ...selectedCampaign, targetAmount: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
            <label className="block text-gray-600 mb-2">Status:</label>
            <select
              value={selectedCampaign.status}
              onChange={(e) => setSelectedCampaign({ ...selectedCampaign, status: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mycampaigns;
