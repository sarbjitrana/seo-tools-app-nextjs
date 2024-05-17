// components/CheckBacklinksForm.js
import React, { useState } from 'react';

function CheckBacklinks() {
  const [targetUrl, setTargetUrl] = useState('');
  const [backlinkData, setBacklinkData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/check-backlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setBacklinkData(data);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Check Backlinks</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mb-2">
          Target URL:
          <input
            type="text"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Check
        </button>
      </form>
      {backlinkData && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Backlink Data</h3>
          <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(backlinkData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CheckBacklinks;
