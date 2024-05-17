// components/CheckRankingForm.js
import React, { useState } from 'react';

function CheckRankingForm() {
  const [keyword, setKeyword] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [rankingData, setRankingData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/check-ranking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword, websiteUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setRankingData(data);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Check Ranking</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mb-2">
          Keyword:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
            className="border p-2"
          />
        </label>
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
      {rankingData && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Ranking Data</h3>
          <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(rankingData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CheckRankingForm;
