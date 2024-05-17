// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
        {/* Add any other footer elements you want */}
      </div>
    </footer>
  );
};

export default Footer;
