import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import Axios
import "../../Styling/AddCampaign.css"; // Custom styling
import Orgnavbar from "./Orgnavbar";
import Org_url from "../../Services/Organizationservice";

const Addcampaign = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [contributionType, setContributionType] = useState("money");

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Prepare the campaign data
      const campaignData = {
        title: data.title,
        description: data.description,
        category: data.category,
        contributiontype: contributionType === "money" ? " money" : " items", // Set contribution type accordingly
        location: data.location,
        startdate: data.startdate,
        enddate: data.enddate,
        email: data.email,
        status: data.status, // Include the new status field
        required: contributionType === "money" ? data.targetAmount : data.goodsType, // Add target amount or goods type for 'required'
      };

      // If contributionType is money, handle targetAmount, otherwise handle goodsType
      if (contributionType === "money") {
        campaignData.contributionDetails = data.targetAmount;
      } else {
        campaignData.contributionDetails = data.goodsType;
      }

      // Append campaign data and image file to FormData
      const formData = new FormData();
      formData.append(
        "camp",
        new Blob([JSON.stringify(campaignData)], { type: "application/json" })
      );

      if (data.image && data.image[0]) {
        formData.append("imagefile", data.image[0]);
      }
      formData.append("orgName", data.orgName);

      // POST request to the backend
      const response = await axios.post(`${Org_url}/addcampaign`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      <Orgnavbar />
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card">
            <h2>Hello, {sessionStorage.getItem("userName")}</h2>
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
                {/* Organization Name */}
                <label htmlFor="orgName">Organization Name</label>
                <input
                  type="text"
                  id="orgName"
                  placeholder="Enter organization name"
                  {...register("orgName", { required: "Organization name is required" })}
                />
                {errors.orgName && <p className="error-text">{errors.orgName.message}</p>}

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
                {errors.description && (
                  <p className="error-text">{errors.description.message}</p>
                )}

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
                <label htmlFor="required">Contribution Type</label>
                <select
                  id="required"
                  {...register("required", { required: "Contribution type is required" })}
                  value={contributionType}
                  onChange={(e) => setContributionType(e.target.value)}
                >
                  <option value="money">Money</option>
                  <option value="goods">Goods</option>
                  <option value="items">Items</option>
                </select>
                {errors.contributionType && (
                  <p className="error-text">{errors.contributionType.message}</p>
                )}

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
                    {errors.targetAmount && (
                      <p className="error-text">{errors.targetAmount.message}</p>
                    )}
                  </>
                )}
                {(contributionType === "goods" || contributionType === "items") && (
                  <>
                    <label htmlFor="required">Specify Goods or Items</label>
                    <textarea
                      id="required"
                      placeholder={`Enter the type of ${
                        contributionType === "goods" ? "goods" : "items"
                      } you need`}
                      {...register("goodsType", { required: "Details of goods/items are required" })}
                    ></textarea>
                    {errors.goodsType && (
                      <p className="error-text">{errors.goodsType.message}</p>
                    )}
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
                <label htmlFor="startdate">Start Date</label>
                <input
                  type="date"
                  id="startdate"
                  {...register("startdate", { required: "Start date is required" })}
                />
                {errors.startDate && <p className="error-text">{errors.startDate.message}</p>}

                {/* End Date */}
                <label htmlFor="enddate">End Date</label>
                <input
                  type="date"
                  id="enddate"
                  {...register("enddate", { required: "End date is required" })}
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

                {/* Campaign Status */}
                <label htmlFor="status">Campaign Status</label>
                <select
                  id="status"
                  {...register("status", { required: "Campaign status is required" })}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.status && <p className="error-text">{errors.status.message}</p>}

                {/* Upload Campaign Image */}
                <label htmlFor="image">Upload Campaign Image</label>
                <input
                  type="file"
                  id="image"
                  {...register("image", { required: "Please upload an image" })}
                />
                {errors.image && <p className="error-text">{errors.image.message}</p>}

                <button type="submit" className="submit-btn">
                  Create Campaign
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
