// pages/onPageSEO.js
import React, { useState } from 'react';
const OnPageSEO = () => {
    const [result, setResult] = useState(null);
    const [url, setUrl] = useState('');
    
    const handleAnalysis = async (e) => {
        e.preventDefault();
        try {
            // Make API request to the On-Page SEO API
            const response = await fetch('/api/on-page-seo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
            } else {
                console.error('Error analyzing On-Page SEO:', response.statusText);
            }
        } catch (error) {
            console.error('Error analyzing On-Page SEO:', error);
        }
    };

    return (
      
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">On-Page SEO Analysis</h1>
                <form onSubmit={handleAnalysis} className="mb-8">
                    <label className="block mb-2">
                        Enter URL for On-Page SEO Analysis:
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Analyze
                    </button>
                </form>

                {result && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                )}
            </div>
       
    );
};

export default OnPageSEO;
