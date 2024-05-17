// pages/contact-us.js
import React from 'react';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

const ContactUs = () => {
  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="mb-4">
          Have questions or suggestions? Reach out to us using the contact information below:
        </p>
        <ContactForm />
      </div>
   
  );
};

export default ContactUs;
