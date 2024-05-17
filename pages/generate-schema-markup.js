// components/GenerateSchemaMarkupForm.js
import React, { useState } from 'react';

function GenerateSchemaMarkupForm() {
  const [webpageUrl, setWebpageUrl] = useState('');
  const [schemaType, setSchemaType] = useState('');
  const [schemaData, setSchemaData] = useState('');
  const [generatedMarkup, setGeneratedMarkup] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        webpageUrl,
        schemaType,
        schemaData: JSON.parse(schemaData),
      };

      const response = await fetch('/api/generate-schema-markup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedMarkup(data.generatedMarkup);
      } else {
        console.error('Error sending POST request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Generate Schema Markup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mb-2">
          Webpage URL:
          <input
            type="text"
            value={webpageUrl}
            onChange={(e) => setWebpageUrl(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <label className="mb-2">
          Schema Type:
          <input
            type="text"
            value={schemaType}
            onChange={(e) => setSchemaType(e.target.value)}
            required
            className="border p-2"
          />
        </label>
        <label className="mb-2">
          Schema Data (JSON):
          <textarea
            value={schemaData}
            onChange={(e) => setSchemaData(e.target.value)}
            required
            className="border p-2"
            cols="25"
            rows="5"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Generate Markup
        </button>
      </form>
      {generatedMarkup && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Generated Schema Markup</h3>
          <pre className="bg-gray-200 p-4 rounded">{generatedMarkup}</pre>
        </div>
      )}
    </div>
  );
}

export default GenerateSchemaMarkupForm;
