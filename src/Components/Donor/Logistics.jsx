import React, { useEffect, useState } from 'react';
import Donornavbar from './Donornavbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Logistics = () => {
  const [user, setUser] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [organizationName, setOrganizationName] = useState('');
  const [organization, setOrganization] = useState(null); // For full organization entity
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [items, setItems] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(''); // Derived from campaign end date
  const [deliveryTime, setDeliveryTime] = useState(''); // Random time between 9 AM and 5 PM
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setdeliveryAddress] = useState('');
  const [error, setError] = useState('');
  const [campaignname, setCampaignname] = useState('');

  const navigate = useNavigate();
  const { campaignId: campaignIdString } = useParams();
  const campaignId = parseInt(campaignIdString, 10); 

  useEffect(() => {
    // Fetch the logged-in user's details from the backend
    axios
      .get("http://localhost:2024/donor/api/getLoggedInDonor", {
        withCredentials: true,
      })
      .then((response) => {
        console.log('User data:', response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setError('Failed to fetch user details. Please try again later.');
      });
  }, []);

  useEffect(() => {
    if (campaignId) {
      axios
        .get(`http://localhost:2024/org/api/campaigndetails/${campaignId}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log('campaignname:',campaignData.title);
          console.log('Campaign data:', response.data);
          const campaignData = response.data;
          setCampaign(campaignData);
          setOrganizationName(campaignData.organization.legalname);
          setOrganization(campaignData.organization);
          setdeliveryAddress(campaignData.organization.adress)
          setCampaignname(campaignData.title)
          
          

         
          

          // Set delivery date from campaign end date
          const endDate = new Date(campaignData.enddate);
          setDeliveryDate(endDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD

          // Set random delivery time between 9 AM and 5 PM
          const randomHour = Math.floor(Math.random() * (17 - 9 + 1)) + 9;
          const randomMinute = Math.floor(Math.random() * 60);
          setDeliveryTime(`${String(randomHour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}`);
        })
        .catch((error) => {
          console.error("Error fetching campaign details:", error);
          setError('Failed to fetch campaign details. Please try again later.');
        });
    }
  }, [campaignId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupAddress || !pickupDate || !pickupTime || !items) {
      setError('Please fill in all the fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post("http://localhost:2024/api/logi/addlog", {
        donor: user, // Get donor ID from the session
        organization, // Organization ID
        campaign, // Campaign ID
        pickupAddress,
        pickupDate,
        pickupTime,
        deliveryDate,
        deliveryTime,
        deliveryAddress,
        items,
      });
      await axios.post('http://localhost:2024/api/donation/adddonation', {
        donorName: user.name,
        campaignId,
        campaignName:campaignname,
        donatedItems:items,
        timestamp: new Date().toISOString(),
       
    });
      

      console.log('Delivery submission response:', response.data);
      alert('Delivery details submitted successfully!');
      navigate('/donorhome'); // Navigate back to the home page or another route
    } catch (error) {
      console.log(user.id,  campaignId);
      console.log(typeof(campaignId));
      console.log( user.id, // Get donor ID from the session
         // Organization ID
        campaignId, // Campaign ID
        pickupAddress,
        pickupDate,
        pickupTime,
        deliveryDate,
        deliveryTime,
        deliveryAddress,
        items,)
      
      console.error('Error submitting delivery details:', error);
      setError('Failed to submit delivery details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Donornavbar />
      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {user ? user.name : 'Loading...'}
            </h2>
          </div>

          {/* Main Card */}
          <div>
            <div className="main-card">
              <div className="mx-auto p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Logistics Details</h1>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="campaignName">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      id="campaignName"
                      value={campaign ? campaign.title : 'Loading...'}
                      readOnly
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="organizationName">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      value={organizationName || 'Loading...'}
                      readOnly
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickupAddress">
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      id="pickupAddress"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickupDate">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      id="pickupDate"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickupTime">
                      Pickup Time
                    </label>
                    <input
                      type="time"
                      id="pickupTime"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="items">
                      Items
                    </label>
                    <textarea
                      id="items"
                      value={items}
                      onChange={(e) => setItems(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Logistics'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;
