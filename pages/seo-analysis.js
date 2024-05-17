// pages/seo-analysis.js
import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
const SeoAnalysis = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('/api/seo-analysis', { url });
      setResults(response.data);
    } catch (error) {
      console.error('Error analyzing SEO:', error.message);
      setResults({ message: 'Error analyzing SEO' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Technical SEO Analysis</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mb-2">
          Website URL:
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
      {loading ? (
        <TailSpin color="red" radius={"8px"} />
      ) : (
        results && (
          <div>
            <h2>Results</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )
      )}
    </div>
  );
};

export default SeoAnalysis;
