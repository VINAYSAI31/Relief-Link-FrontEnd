import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import AdminNavbar from './Adminnavbar';
import '../../Styling/Admins.css'; // Importing the new CSS

const Admins = () => {
  // State to store admins data
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch admins from the API
  useEffect(() => {
    axios
      .get('http://localhost:2024/admin/api/getalladmins') // Replace with your actual API endpoint
      .then((response) => {
        setAdmins(response.data); // Assuming the response contains the array of admins
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []); // Empty array to fetch only once when the component mounts

  // Handle delete
  const handleDelete = (username) => {
    const updatedAdmins = admins.filter((admin) => admin.username !== username);
    setAdmins(updatedAdmins);
  };

  // Handle add (dummy for now)
  const handleAdd = () => {
    const newAdmin = {
      username: `Admin${admins.length + 1}`,
      password: `password${admins.length + 1}`,
    };
    setAdmins([...admins, newAdmin]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
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
            <div className="header">
              <h2>Admins List</h2>
              <button onClick={handleAdd} className="add-admin-btn">
                Add Admin
              </button>
            </div>

            <table className="admins-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.username}>
                    <td>{admin.id}</td>
                    <td>{admin.username}</td>
                    <td>{admin.password}</td>
                    <td>
                      <button onClick={() => handleDelete(admin.username)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admins;
