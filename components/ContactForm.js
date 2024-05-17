// components/ContactForm.js
import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Form submitted:', { name, email, message });
    // You may want to send the form data to your backend or API
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          className="w-full border p-2"
          required
        ></textarea>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
