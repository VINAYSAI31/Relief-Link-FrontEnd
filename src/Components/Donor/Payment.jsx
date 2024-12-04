import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Donornavbar from './Donornavbar';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51O8oHhSAo6Ac8f4rgeTFAqehSKtRRk2HZvPlqmRqGQRR4Nbx9wwnA0nWmDdG85Pagp8vxBIwF6DdqZxFeZ5tD2vd00K39LXQiH');

const Payment = () => {
    const [amount, setAmount] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [campaignName, setCampaignName] = useState('');
   

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { campaignId } = useParams();
    console.log(campaignId)

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:2024/org/api/campaigndetails/${campaignId}`);
                console.log('API Response:', response);

                if (response.data) {
                    console.log('Fetched Campaign Details:', response.data);
                    console.log(response.data.title);
                    setCampaignName(response.data.title);
                   
                }
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            }
        };

        if (campaignId) {
            console.log('Fetching details for Campaign ID:', campaignId);
            fetchCampaignDetails();
        }
    }, [campaignId]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("http://localhost:2024/donor/api/getLoggedInDonor", {
                    withCredentials: true,
                });

                if (response.data) {
                    const { name, email, address } = response.data;
                    setCustomerName(name || '');
                    setCustomerEmail(email || '');
                    setCustomerAddress(address || '');
                } else {
                    console.error('No user details returned from API');
                }
            } catch (error) {
                console.error('Error fetching session details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handlePayment = async () => {
        if (!customerName || !customerEmail || !customerAddress || amount <= 0) {
            alert('Please provide all customer details and a valid amount.');
            return;
        }

        try {
            const response = await fetch(
                'http://localhost:2024/api/payment/create-payment-intent?' +
                new URLSearchParams({
                    amount: amount * 100,
                    customerName: customerName,
                    customerEmail: customerEmail,
                    customerAddress: customerAddress,
                }),
                { method: 'POST' }
            );

            if (!response.ok) {
                throw new Error('Failed to create payment intent.');
            }

            const data = await response.json();

            if (data.clientSecret) {
                const card = elements.getElement(CardElement);
                const result = await stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: customerName,
                            email: customerEmail,
                            address: {
                                line1: customerAddress,
                                country: 'IN',
                            },
                        },
                    },
                });

                if (result.error) {
                    alert(result.error.message);
                } else {
                    alert('Payment successful!');

                    await axios.post('http://localhost:2024/api/donation/adddonation', {
                        donorName: customerName,
                        campaignId,
                        campaignName,
                        amount,
                        timestamp: new Date().toISOString(),
                       
                    });

                    navigate('/donorhome');
                }
            } else {
                alert(data.error || 'An error occurred');
            }
        } catch (error) {
            alert('An unexpected error occurred: ' + error.message);
        }
    };

    return (
        <div className="dashboard-container">
            <Donornavbar />
            <div className="main-content">
                <div className="card-container">
                    <div className="top-card">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Welcome, {customerName || 'Loading...'}
                        </h2>
                    </div>

                    <div className="main-card">
                        <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white mt-10">
                            <h2 className="text-2xl font-bold mb-4 text-center">Payment Form</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                    color: '#aab7c4',
                                                },
                                            },
                                            invalid: {
                                                color: '#9e2146',
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <button
                                onClick={handlePayment}
                                className="w-full bg-indigo-500 text-white py-2 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentFormWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <Payment />
        </Elements>
    );
};

export default PaymentFormWrapper;
