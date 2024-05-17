// components/OptimizeGoogleMyBusinessForm.js
import React, { useState } from 'react';

function OptimizeGoogle() {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [optimizationResult, setOptimizationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        businessName,
        address,
        phone,
        website,
      };

      const response = await fetch('/api/optimize-google-my-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setOptimizationResult(data);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Optimize Google My Business</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-2">
          Business Name:
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <label className="mb-2">
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <label className="mb-2">
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <label className="mb-2">
          Website:
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Optimize
        </button>
      </form>
      {optimizationResult && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Optimization Result</h3>
          <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(optimizationResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default OptimizeGoogle;
