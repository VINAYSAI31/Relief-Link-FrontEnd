import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import ProjectNavbar from '../ProjectNavbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid phone number');
      return;
    }
    setError('');
  
    // Prepend '+91' to the phone number
    const formattedPhone = `+91${phone}`;
  
    try {
      const response = await fetch('http://localhost:2024/api/delivery/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formattedPhone }), // Use formatted phone number
      });
  
      if (!response.ok) {
        throw new Error('Failed to send OTP. Please try again.');
      }
      setStep('otp');
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid phone number');
      return;
    }
  
    // Format the phone number with the country code
    const formattedPhone = `+91${phone}`;
  
    try {
      const response = await fetch('http://localhost:2024/api/delivery/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhone, otp }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid OTP. Please try again.');
      }
      alert('OTP verified successfully!');
      navigate('/logisticshome')
      // Optionally, reset state after successful verification
      setPhone('');
      setOtp('');
      setStep('phone');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <ProjectNavbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 p-2">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="mt-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="mt-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter OTP"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-sm text-blue-600 hover:text-blue-500"
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
