import React, { useState } from 'react';
import { 
  Menu, 
  Home, 
  User, 
  LayoutDashboard, 
  Heart, 
  History, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Donor Navbar Component
const DonorNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:2024/donor/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Clear tokens and redirect to login page
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href = '/donorlogin';
      } else {
        console.error('Failed to logout:', response.statusText);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <nav
      className={`w-64 h-screen bg-gray-900 fixed left-0 top-0 border-r border-gray-800
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
       
        <header className={`p-6 border-b border-gray-800 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-primary-500" />
            <h1 className="text-xl font-bold text-white">Donor</h1>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-indigo-700 transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          
        </header>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Welcome </h2>
              <p className="text-xs text-gray-200">donor </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 space-y-1 px-3 text-gray-100">
          <div className="space-y-2 px-3">
          <NavItem icon={Home} text="Home" to="/donorhome" isCollapsed={isCollapsed} />
            <NavItem icon={User} text="My Profile" to="/myprofile" isCollapsed={isCollapsed} />
            <NavItem icon={LayoutDashboard} text="Dashboard" to="/mydashboard" isCollapsed={isCollapsed} />
            <NavItem icon={Heart} text="Make a Donation" to="/allcamps" isCollapsed={isCollapsed} />
            <NavItem icon={History} text="Donation History" to="/donationhistory" isCollapsed={isCollapsed} />
            <NavItem icon={Settings} text="Settings" to="/settings" isCollapsed={isCollapsed} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-200 hover:bg-red-900/50 transition-colors
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Navigation Item Component


const NavItem= ({ icon: Icon, text, to, isCollapsed }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-700/50 transition-colors
        ${isCollapsed ? 'justify-center' : ''}`}
    >
      <Icon size={20} />
      {!isCollapsed && <span>{text}</span>}
    </Link>
  );
};

export default DonorNavbar;
