import React from 'react';
import '../Styling/Projecthome.css'
import ProjectNavbar from './ProjectNavbar';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Projecthome = () => {
  return (
   <>
   
   <ProjectNavbar/>
   <div className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-white pt-16">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <Heart className="h-8 w-8 text-teal-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Make a Difference</span>
            <span className="block text-teal-600">Change Lives Today</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Join our community of changemakers and help create a better world through the power of giving.
            Every donation counts, every action matters.
          </p>
          <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 md:px-10 md:py-4 md:text-lg">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-teal-50 p-6">
              <h3 className="mb-2 text-lg font-semibold text-teal-900">Our Impact</h3>
              <p className="text-teal-700">
                Together, we've helped thousands of people in need through your generous donations.
              </p>
            </div>
            <div className="rounded-lg bg-teal-50 p-6">
              <h3 className="mb-2 text-lg font-semibold text-teal-900">Transparency</h3>
              <p className="text-teal-700">
                Track your donations and see exactly how your contribution makes a difference.
              </p>
            </div>
            <div className="rounded-lg bg-teal-50 p-6">
              <h3 className="mb-2 text-lg font-semibold text-teal-900">Community</h3>
              <p className="text-teal-700">
                Join a network of passionate individuals committed to positive change.
              </p>
            </div>
          </div>
        </section>
    </div>
    
   </>
  );
};

export default Projecthome;
