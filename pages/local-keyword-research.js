// components/LocalKeywordResearchForm.js
import React, { useState } from 'react';

function LocalKeywordResearchForm() {
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');
  const [researchResults, setResearchResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        location,
        keyword,
      };

      const response = await fetch('/api/local-keyword-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setResearchResults(data);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Local Keyword Research</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mb-2">
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border p-2"
          />
        </label>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Research
        </button>
      </form>
      {researchResults && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Research Results</h3>
          <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(researchResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default LocalKeywordResearchForm;
