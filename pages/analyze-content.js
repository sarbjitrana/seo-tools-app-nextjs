// components/AnalyzeContentForm.js
import React, { useState } from 'react';

function AnalyzeContentForm() {
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        content,
        keywords: keywords.split(',').map((keyword) => keyword.trim()),
      };

      const response = await fetch('/api/analyze-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analyze Content</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mb-2">
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border p-2"
            cols="23"
            rows="5"
          />
        </label>
        <label className="mb-2">
          Keywords (comma-separated):
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Analyze
        </button>
      </form>
      {analysisResult && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Analysis Result</h3>
          <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AnalyzeContentForm;
