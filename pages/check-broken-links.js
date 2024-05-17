// components/CheckBrokenLinksForm.js
import React, { useState } from 'react';

function CheckBrokenLinksForm() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [brokenLinks, setBrokenLinks] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/check-broken-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setBrokenLinks(data.brokenLinks);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Check Broken Links</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mb-2">
          Website URL:
          <input
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
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
      {brokenLinks !== null && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Broken Links</h3>
          {brokenLinks.length === 0 ? (
            <p>No broken links found.</p>
          ) : (
            <ul>
              {brokenLinks.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckBrokenLinksForm;
