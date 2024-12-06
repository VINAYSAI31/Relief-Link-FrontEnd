

import { Link } from 'react-router-dom';
import LogisticsNavbar from './LogisticsNavbar';

const LogisticsHome = () => {
  


  return (
    <div className="dashboard-container">
      <LogisticsNavbar />
      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome Partner 
            </h2> {/* Display user name with Tailwind CSS */}
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <i className="fas fa-search"></i>
            </div>
            <div className="bell-icon">
              <i className="fas fa-bell"></i>
            </div>
          </div>

          {/* Main Card */}
          <div >
          <div className="main-card p-6 border-t-4 border-blue-500 bg-blue-50 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Make a Difference Today!</h3>
            <p className="text-gray-700 mb-6">
              Your support means the world to those in need. With each contribution, you bring hope and positive change to countless lives. Every donation counts and takes us closer to making an impact.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-md shadow-md text-center">
                <h4 className="font-semibold text-gray-800">Total Donations</h4>
                <p className="text-blue-600 font-bold text-2xl">$12,345</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-md text-center">
                <h4 className="font-semibold text-gray-800">Lives Impacted</h4>
                <p className="text-green-600 font-bold text-2xl">1,234</p>
              </div>
            </div>
            <Link to='/allcamps'>
            <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              Donate Now
            </button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsHome;
