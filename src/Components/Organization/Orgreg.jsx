import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../Styling/Orgreg.css'; // Import updated styles
import ProjectNavbar from '../ProjectNavbar';
import Org_url from '../../Services/Organizationservice';
import { useNavigate } from 'react-router-dom';

const Orgreg = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const naviagte=useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${Org_url}/addorg`, data);
      console.log('Response:', response.data);
      alert('Organization Registered Successfully!');
      naviagte('/orglogin');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register organization');
    }
  };

  return (
   <>
   <ProjectNavbar/>
   <div className="org-form-container">
      <h2 className="org-form-header">Register Your Organization</h2>

      {/* Information Box */}
      

      {/* Organization Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="org-form">
        
        <div className="org-input-container">
          <label htmlFor="name">Organization Name</label>
          <input
            id="orgName"
            {...register('name', { required: 'Organization Name is required' })}
            type="text"
            placeholder="Enter Organization Name"
          />
          {errors.orgName && <p className="org-input-error">{errors.orgName.message}</p>}
        </div>

        <div className="org-input-container">
          <label htmlFor="legalname">Legal Name</label>
          <input
            id="legalName"
            {...register('legalname', { required: 'Legal Name is required' })}
            type="text"
            placeholder="Enter Legal Name"
          />
          {errors.legalName && <p className="org-input-error">{errors.legalName.message}</p>}
        </div>

        <div className="org-input-container">
          <label htmlFor="type">Organization Type</label>
          <select
            id="orgType"
            {...register('type', { required: 'Organization Type is required' })}
          >
            <option value="">Select Organization Type</option>
            <option value="Nonprofit">Nonprofit</option>
            <option value="Corporate">Corporate</option>
            <option value="Educational">Educational</option>
            <option value="Government">Government</option>
          </select>
          {errors.orgType && <p className="org-input-error">{errors.orgType.message}</p>}
        </div>

        <div className="org-input-container">
          <label htmlFor="adress">Address</label>
          <input
            id="orgAddress"
            {...register('adress', { required: 'Address is required' })}
            type="text"
            placeholder="Enter Organization Address"
          />
          {errors.orgAddress && <p className="org-input-error">{errors.orgAddress.message}</p>}
        </div>
        

        <div className="org-input-container">
          <label htmlFor="email">Contact Email</label>
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
            placeholder="Enter Contact Email"
          />
          <i className="fas fa-envelope"></i>
          {errors.contactEmail && <p className="org-input-error">{errors.contactEmail.message}</p>}
        </div>
        <div className="org-input-container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register('password', { required: 'password is required' })}
            type="password',"
            placeholder="Enter your password"
          />
          {errors.password && <p className="org-input-error">{errors.password.message}</p>}
        </div>

        <div className="org-input-container">
          <label htmlFor="phonenumber">Contact Phone</label>
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
            placeholder="Enter Contact Phone"
          />
          <i className="fas fa-phone-alt"></i>
          {errors.contactPhone && <p className="org-input-error">{errors.contactPhone.message}</p>}
        </div>

        <div className="org-input-container">
          <label htmlFor="webrul">Website URL</label>
          <input
            id="website"
            {...register('weburl')}
            type="url"
            placeholder="Enter Website URL"
          />
          <i className="fas fa-globe"></i>
        </div>

        <button type="submit">Register Organization</button>
      </form>
    </div>
   </>
  );
};

export default Orgreg;
