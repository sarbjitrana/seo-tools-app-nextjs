// components/CompareCompetitorsForm.js
import React, { useState } from 'react';

function CompareCompetitorsForm() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [competitorUrls, setCompetitorUrls] = useState(['', '']);
  const [comparisonData, setComparisonData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/compare-competitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteUrl,
          competitors: competitorUrls.map((url) => ({ url })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComparisonData(data);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  const handleCompetitorUrlChange = (index, value) => {
    const updatedUrls = [...competitorUrls];
    updatedUrls[index] = value;
    setCompetitorUrls(updatedUrls);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Compare Competitors</h2>
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
        {competitorUrls.map((url, index) => (
          <label key={index} className="mb-2">
            Competitor {index + 1} URL:
            <input
              type="text"
              value={url}
              onChange={(e) => handleCompetitorUrlChange(index, e.target.value)}
              required
              className="border p-2"
            />
          </label>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Compare
        </button>
      </form>
      {comparisonData && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Comparison Data</h3>
          <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(comparisonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CompareCompetitorsForm;
