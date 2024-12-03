import React from "react";

const ProjectNavbar = () => {
  return (
    <nav className="bg-white bg-opacity-90 p-4 flex items-center justify-between fixed w-full top-0 left-0 z-10 shadow-lg h-20">
      {/* Logo */}
      <div className="text-black text-2xl font-bold">
        <a href="/">Relief Link</a>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-8">
        <li><a href="#" className="text-black text-xl hover:text-red-500 transition duration-300">Home</a></li>
        <li><a href="#" className="text-black text-xl hover:text-red-500 transition duration-300">About</a></li>
        <li><a href="#" className="text-black text-xl hover:text-red-500 transition duration-300">Services</a></li>
        <li><a href="#" className="text-black text-xl hover:text-red-500 transition duration-300">Contact</a></li>
      </ul>

      {/* Auth Buttons */}
      <div className="space-x-4">
        <a href="/register" className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition duration-300">Sign Up</a>
        <a href="/Adminlogin" className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300">Admin</a>
      </div>
    </nav>
  );
};

export default ProjectNavbar;
