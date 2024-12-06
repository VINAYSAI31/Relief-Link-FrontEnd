import React from "react";
import { Link } from "react-router-dom";
import { Users, DollarSign, Building2, Truck } from 'lucide-react';

function NavButton({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

const ProjectNavbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-teal-600">Relief Link</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <NavButton
            icon={<Building2 className="h-5 w-5" />}
            label="Admin"
            to="/Adminlogin" // Set the path for the route
          />
          <NavButton
            icon={<DollarSign className="h-5 w-5" />}
            label="Donate"
            to="/donorlogin" // Set the path for the route
          />
          <NavButton
            icon={<Users className="h-5 w-5" />}
            label="Join Our Community"
            to="/orglogin" // Set the path for the route
          />
          <NavButton
            icon={<Truck className="h-5 w-5" />}
            label="Logistics"
            to="/logisticslogin" // Set the path for the route
          />
        </div>
      </div>
    </nav>
  );
};

export default ProjectNavbar;
