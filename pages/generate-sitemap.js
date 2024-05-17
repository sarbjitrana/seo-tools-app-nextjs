// components/GenerateSitemapForm.js
import React, { useState } from 'react';

function GenerateSitemapForm() {
  const [url, setUrl] = useState('');
  const [sitemapURL, setSitemapURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/generate-sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setSitemapURL(data.sitemapURL);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Generate Sitemap</h2>
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
          Generate
        </button>
      </form>
      {sitemapURL && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Sitemap URL</h3>
          <p>{sitemapURL}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateSitemapForm;
