// components/CheckRobotsTxtForm.js
import React, { useState } from 'react';

function CheckRobotsTxtForm() {
  const [url, setUrl] = useState('');
  const [robotsTxtContent, setRobotsTxtContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/check-robots-txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setRobotsTxtContent(data.robotsTxtContent);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Check Robots.txt</h2>
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
      {robotsTxtContent && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Robots.txt Content</h3>
          <pre className="bg-gray-200 p-4 rounded">{robotsTxtContent}</pre>
        </div>
      )}
    </div>
  );
}

export default CheckRobotsTxtForm;
