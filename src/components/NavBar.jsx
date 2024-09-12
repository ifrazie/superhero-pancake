import React from 'react';
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600">SaaSify</span>
          </div>
          <div className="flex items-center">
            <Button variant="default" className="ml-4">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;