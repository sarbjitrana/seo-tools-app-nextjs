import React, { useState } from 'react';
import axios from 'axios';

function Analyse() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/analyze', {
                url: url,
            });

            // Handle the response data as needed
            setResult(response.data);
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Analyze URL</h2>
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
                    Analyze
                </button>
            </form>
            {result && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Analysis Result</h3>
                    <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Analyse;
