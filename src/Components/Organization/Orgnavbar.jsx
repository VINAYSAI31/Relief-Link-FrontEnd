import React from 'react';
import { Menu, Home, Users, PlusCircle, BarChart3, Settings, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavItem = ({ icon: Icon, label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-6 py-3.5 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors rounded-lg group relative"
  >
    <div className="absolute left-0 w-1 h-full bg-primary-500 scale-y-0 group-hover:scale-y-100 transition-transform" />
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </Link>
);

const Orgnavbar = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:2024/org/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Clear tokens and redirect to login page
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href = '/orglogin';
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
    <aside className="w-64 h-screen bg-gray-900 fixed left-0 top-0 border-r border-gray-800 ">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-primary-500" />
            <h1 className="text-xl font-bold text-white">Organization</h1>
          </div>
        </header>

        {/* User Info */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Welcome back</h2>
              <p className="text-xs text-gray-400">Organization Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 space-y-1 px-3">
          <NavItem icon={Home} label="Dashboard" to="/dashboard" />
          <NavItem icon={User} label="Organization Profile" to="/orgprofile" />
          <NavItem icon={PlusCircle} label="Add Campaign" to="/addcampaign" />
          <NavItem icon={BarChart3} label="My Campaigns" to="/mycampaigns" />
          <NavItem icon={Users} label="Team Members" to="/orgmembers" />
          <NavItem icon={Settings} label="Settings" to="/settings" />
        </nav>

        {/* Footer */}
        <footer className="p-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </footer>
      </div>
    </aside>
  );
};

export default Orgnavbar;
