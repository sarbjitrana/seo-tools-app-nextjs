// components/KeywordSuggestionsForm.js
import React, { useState } from 'react';

function KeywordSuggestions() {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/keyword-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Keyword Suggestions</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Get Suggestions
        </button>
      </form>
      {suggestions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Suggestions</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} className="mb-1">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KeywordSuggestions;
