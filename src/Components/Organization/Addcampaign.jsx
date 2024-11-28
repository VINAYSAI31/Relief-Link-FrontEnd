import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Import Axios
import '../../Styling/AddCampaign.css'; // Custom styling
import Orgnavbar from './Orgnavbar';
import Org_url from '../../Services/Organizationservice';

const Addcampaign = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [contributionType, setContributionType] = useState("money");

  // Function to handle form submission
  const onSubmit = async (data) => {
    // Create a new FormData object
    const formData = new FormData();
    
    // Append form data
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("contributionType", data.contributionType);
    formData.append("location", data.location);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("email", data.email);

    // Check if there is an image file and append it to the FormData
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // Assuming `image` is a file input
    }

    // If contribution type is "goods" or "items", include the goodsType details
    if (contributionType !== "money") {
      formData.append("contributionDetails", data.goodsType);
    }

    try {
      const response = await axios.post(`${Org_url}/addcampaign`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important to specify the content type
        },
      });
      alert("Campaign added successfully!");
      reset(); // Reset the form after submission
    } catch (error) {
      console.error("Error adding campaign:", error);
      alert("Failed to add campaign. Please try again.");
    }
  };

  return (
    <>
    <Orgnavbar/>
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
          <div className="add-campaign-container">
      <h2 className="add-campaign-title">Create a New Donation Campaign</h2>
      <p className="add-campaign-description">
        Provide the details below to start a campaign and help those in need.
      </p>

      <form className="add-campaign-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Campaign Title */}
        <label htmlFor="title">Campaign Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter campaign title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="error-text">{errors.title.message}</p>}

        {/* Description */}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter campaign description"
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && <p className="error-text">{errors.description.message}</p>}

        {/* Category */}
        <label htmlFor="category">Category</label>
        <select
          id="category"
          {...register("category", { required: "Category is required" })}
        >
          <option value="">Select Category</option>
          <option value="Disaster Relief">Disaster Relief</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Environment">Environment</option>
        </select>
        {errors.category && <p className="error-text">{errors.category.message}</p>}

        {/* Contribution Type */}
        <label htmlFor="contributionType">Contribution Type</label>
        <select
          id="contributionType"
          {...register("contributionType", { required: "Contribution type is required" })}
          value={contributionType}
          onChange={(e) => setContributionType(e.target.value)}
        >
          <option value="money">Money</option>
          <option value="goods">Goods</option>
          <option value="items">Items</option>
        </select>
        {errors.contributionType && <p className="error-text">{errors.contributionType.message}</p>}

        {/* Target Amount or Goods Details */}
        {contributionType === "money" && (
          <>
            <label htmlFor="targetAmount">Target Amount (₹)</label>
            <input
              type="number"
              id="targetAmount"
              placeholder="Enter target amount"
              {...register("targetAmount", {
                required: "Target amount is required",
                min: { value: 100, message: "Minimum target amount is ₹100" },
              })}
            />
            {errors.targetAmount && <p className="error-text">{errors.targetAmount.message}</p>}
          </>
        )}
        {(contributionType === "goods" || contributionType === "items") && (
          <>
            <label htmlFor="goodsType">Specify Goods or Items</label>
            <textarea
              id="goodsType"
              placeholder={`Enter the type of ${contributionType === "goods" ? "goods" : "items"} you need`}
              {...register("goodsType", { required: "Details of goods/items are required" })}
            ></textarea>
            {errors.goodsType && <p className="error-text">{errors.goodsType.message}</p>}
          </>
        )}

        {/* Location */}
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Enter location (City/State)"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && <p className="error-text">{errors.location.message}</p>}

        {/* Start Date */}
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          {...register("startDate", { required: "Start date is required" })}
        />
        {errors.startDate && <p className="error-text">{errors.startDate.message}</p>}

        {/* End Date */}
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          {...register("endDate", { required: "End date is required" })}
        />
        {errors.endDate && <p className="error-text">{errors.endDate.message}</p>}

        {/* Contact Email */}
        <label htmlFor="email">Contact Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter contact email"
          {...register("email", { required: "Contact email is required" })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        {/* Upload Campaign Image */}
        <label htmlFor="image">Upload Campaign Image</label>
        <input
          type="file"
          id="image"
          {...register("image", { required: "Campaign image is required" })}
        />
        {errors.image && <p className="error-text">{errors.image.message}</p>}

        {/* Submit Button */}
        <button type="submit" className="submit-campaign-btn">
          Add Campaign
        </button>
      </form>
    </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addcampaign;
