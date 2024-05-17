// components/CheckMobileFriendlinessForm.js
import React, { useState } from 'react';

function CheckMobileFriendliness() {
  const [url, setUrl] = useState('');
  const [mobileFriendliness, setMobileFriendliness] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/check-mobile-friendliness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setMobileFriendliness(data.mobileFriendliness);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div class="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Check Mobile Friendliness</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Check
        </button>
      </form>
      {mobileFriendliness !== null && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Mobile Friendliness</h3>
          <p>{mobileFriendliness ? 'Mobile-Friendly' : 'Not Mobile-Friendly'}</p>
        </div>
      )}
    </div>
  );
}

export default CheckMobileFriendliness;
