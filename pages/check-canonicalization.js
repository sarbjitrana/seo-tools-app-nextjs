// pages/check-canonicalization.js
import React, { useState } from 'react';
import axios from 'axios';

const CheckCanonicalization = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/check-canonicalization', { url });
      setResult(response.data.message);
    } catch (error) {
      console.error('Error checking canonicalization:', error.message);
      setResult('Error checking canonicalization');
    }
  };

  return (
    <div>
      <h1>Check Canonicalization</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mb-2">
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <button type="submit"  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition">Check</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default CheckCanonicalization;
