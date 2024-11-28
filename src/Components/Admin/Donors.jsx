import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '../../Styling/Donors.css' // Import any necessary CSS for styling
import Admin_url from '../../Services/Adminservice';
import AdminNavbar from './Adminnavbar';
import Donor_url from '../../Services/Donorservice';

const Donors = () => {
  const [donors, setDonors] = useState([]); // State to store donors data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [newDonor, setNewDonor] = useState({
    name: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: '',
  }); // For adding a new donor
  const [showAddDonorForm, setShowAddDonorForm] = useState(false);  // For storing selected donor for edit

  // Fetch donors from the API
  useEffect(() => {
    axios
      .get(`${Admin_url}/getalldonors`) // Replace with the actual URL
      .then((response) => {
        setDonors(response.data); // Assuming the response contains the array of donors
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch donors');
        setLoading(false);
      });
  }, []);

  // Handle delete donor
  const handleDelete = (id) => {
    axios
      .delete(`${Admin_url}/deletedonor/${id}`) // Assuming the delete API URL is like this
      .then((response) => {
        setDonors(donors.filter((donor) => donor.id !== id));
        alert("deleted succesfuly!") // Update the state after deleting
      })
      .catch((err) => {
        console.error('Error deleting donor:', err);
      });
  };

  // Handle selecting donor for edit
  const handleEdit = (donor) => {
    setSelectedDonor(donor); // Set the donor data to the selected donor for editing
  };

  // Handle updating donor details
  const handleUpdate = () => {
    const updatedDonor = {
      ...selectedDonor,
      name: selectedDonor.name,
      gender: selectedDonor.gender,
      dateofbirth: selectedDonor.dateofbirth,
      email: selectedDonor.email,
      password: selectedDonor.password,
      location: selectedDonor.location,
      contact: selectedDonor.contact,
    };

    axios
      .put(`${Admin_url}/updatedonor/${selectedDonor.id}`, updatedDonor) // Assuming update API URL
      .then((response) => {
        setDonors(
          donors.map((donor) =>
            donor.id === selectedDonor.id ? updatedDonor : donor
          )
         
        );
        alert("Updated successfully");
        setSelectedDonor(null);
         // Close the form after update
      })
      .catch((err) => {
        console.error('Error updating donor:', err);
      });
  };


    // Handle adding a new donor
    const handleAddDonor = () => {
        axios
          .post(`${Donor_url}/donorregister`, newDonor) // Assuming the API endpoint for adding donors
          .then((response) => {
            setDonors([...donors, response.data]); // Update state with the new donor
            alert('Donor added successfully!');
            setNewDonor({
              name: '',
              gender: '',
              dateofbirth: '',
              email: '',
              password: '',
              location: '',
              contact: '',
            });
            setShowAddDonorForm(false); // Hide the form after adding
          })
          .catch((err) => {
            console.error('Error adding donor:', err);
          });
      };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
  <>
  <div className="admin-home">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card">
            <h2>Hello Admin</h2>
            <div className="top-actions">
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <i className="fas fa-search"></i>
              </div>
              <div className="bell-icon">
                <i className="fas fa-bell"></i>
              </div>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div className="main-card">
          <div className="donors-container">
      <h2>Donors List</h2>
         <button
                  className="add-admin-btn"
                  onClick={() => setShowAddDonorForm(true)}
                >
                  Add Donor
                </button>
      <table className="donors-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Password</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.id}>
              <td>{donor.id}</td>
              <td>{donor.name}</td>
              <td>{donor.gender}</td>
              <td>{donor.dateofbirth}</td>
              <td>{donor.email}</td>
              <td>{donor.password}</td>
              <td>{donor.location}</td>
              <td>{donor.contact}</td>
              <td>
  <button onClick={() => handleDelete(donor.id)} style={{ marginRight: '10px' }}>
    Delete
  </button>
  <button onClick={() => handleEdit(donor)}>Edit</button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
{/* add Form Popup */}
      {showAddDonorForm && (
                  <div className="popup-form">
                    <div className="form-container">
                      <h3>Add New Donor</h3>
                      <label>Name:</label>
                      <input
                        type="text"
                        value={newDonor.name}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, name: e.target.value })
                        }
                      />
                      <label>Gender:</label>
                      <input
                        type="text"
                        value={newDonor.gender}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, gender: e.target.value })
                        }
                      />
                      <label>Date of Birth:</label>
                      <input
                        type="date"
                        value={newDonor.dateofbirth}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, dateofbirth: e.target.value })
                        }
                      />
                      <label>Email:</label>
                      <input
                        type="email"
                        value={newDonor.email}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, email: e.target.value })
                        }
                      />
                      <label>Password:</label>
                      <input
                        type="password"
                        value={newDonor.password}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, password: e.target.value })
                        }
                      />
                      <label>Location:</label>
                      <input
                        type="text"
                        value={newDonor.location}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, location: e.target.value })
                        }
                      />
                      <label>Contact:</label>
                      <input
                        type="text"
                        value={newDonor.contact}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, contact: e.target.value })
                        }
                      />
                      <button onClick={handleAddDonor} style={{ marginRight: '10px' }}>Add Donor</button>
                      <button onClick={() => setShowAddDonorForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}


      {/* Edit Form Popup */}
      {selectedDonor && (
        <div className="popup-form">
          <div className="form-container">
            <h3>Edit Donor Details</h3>
            <label>Name:</label>
            <input
              type="text"
              value={selectedDonor.name}
              onChange={(e) => setSelectedDonor({ ...selectedDonor, name: e.target.value })}
            />
            <label>Gender:</label>
            <input
              type="text"
              value={selectedDonor.gender}
              onChange={(e) => setSelectedDonor({ ...selectedDonor, gender: e.target.value })}
            />
            <label>Date of Birth:</label>
            <input
              type="date"
              value={selectedDonor.dateofbirth}
              onChange={(e) => setSelectedDonor({ ...selectedDonor, dateofbirth: e.target.value })}
            />
            <label>Email:</label>
            <input
              type="email"
              value={selectedDonor.email}
              onChange={(e) => setSelectedDonor({ ...selectedDonor, email: e.target.value })}
            />
            <label>Password:</label>
            <input
              type="password"
              value={selectedDonor.password}
              onChange={(e) => setSelectedDonor({ ...selectedDonor, password: e.target.value })}
            />
            <label>Location:</label>
            <input
              type="text"
              value={selectedDonor.location}
              onChange={(e) => setSelectedDonor({ ...selectedDonor, location: e.target.value })}
            />
            <label>Contact:</label>
            <input
              type="text"
              value={selectedDonor.contact}
              onChange={(e) => setSelectedDonor({ ...selectedDonor, contact: e.target.value })}
            />
            <button onClick={handleUpdate} style={{ marginRight: '10px' }}>Update</button>
            <button onClick={() => setSelectedDonor(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
          </div>
        </div>
      </div>    
    </div>
  </>
  );
};

export default Donors;
