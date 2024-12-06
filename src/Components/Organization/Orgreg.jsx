import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../Styling/Orgreg.css'; // Ensure the CSS file is updated for styling consistency
import ProjectNavbar from '../ProjectNavbar';
import Org_url from '../../Services/Organizationservice';
import { useNavigate } from 'react-router-dom';
import { Globe, Phone, Mail, Lock, Building } from 'lucide-react';

const Orgreg = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${Org_url}/addorg`, data);
      console.log('Response:', response.data);
      alert('Organization Registered Successfully!');
      navigate('/orglogin');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register organization');
    }
  };

  return (
    <>
      <ProjectNavbar />
      <div className="min-h-screen flex items-center justify-center p-4 background-pattern">
        <div className="bg-white background-pattern-org max-w-lg w-full backdrop-blur-lg rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 mt-20">
          <h2 className="text-3xl font-bold text-center text-black mb-8">Register Your Organization</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 h-5 w-5" />
              <input
                id="orgName"
                {...register('name', { required: 'Organization Name is required' })}
                type="text"
                placeholder="Organization Name"
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-12 text-black placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 h-5 w-5" />
              <input
                id="legalName"
                {...register('legalname', { required: 'Legal Name is required' })}
                type="text"
                placeholder="Legal Name"
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-12 text-black placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors.legalname && <p className="text-red-500 text-sm mt-1">{errors.legalname.message}</p>}
            </div>

            <div className="relative">
              <select
                id="orgType"
                {...register('type', { required: 'Organization Type is required' })}
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">Select Organization Type</option>
                <option value="Nonprofit">Nonprofit</option>
                <option value="Corporate">Corporate</option>
                <option value="Educational">Educational</option>
                <option value="Government">Government</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>

            <div className="relative">
              <Mail  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 h-5 w-5" />
              <input
                id="contactEmail"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Contact Email"
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-12 text-black placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 h-5 w-5" />
              <input
                id="password"
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="Password"
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-12 text-black placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 h-5 w-5" />
              <input
                id="contactPhone"
                {...register('phonenumber', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Invalid phone number',
                  },
                })}
                type="tel"
                placeholder="Contact Phone"
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-12 text-black placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors.phonenumber && <p className="text-red-500 text-sm mt-1">{errors.phonenumber.message}</p>}
            </div>

            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 h-5 w-5" />
              <input
                id="website"
                {...register('weburl')}
                type="url"
                placeholder="Website URL"
                className="w-full bg-white/20 border border-emerald-300/30 rounded-lg py-3 px-12 text-black placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Register Organization
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Orgreg;
