// pages/check-http-status-code.js
import React, { useState } from 'react';
import axios from 'axios';

const CheckHttpStatusCode = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/check-http-status-code', { url });
      setResult(response.data.message);
    } catch (error) {
      console.error('Error checking HTTP status code:', error.message);
      setResult('Error checking HTTP status code');
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Check HTTP Status Code</h1>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit">Check</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default CheckHttpStatusCode;
