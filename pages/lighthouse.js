// pages/lighthouse.js
import React, { useState } from 'react';
import axios from 'axios';
import Loader from '@/components/loader';

const LighthousePage = () => {
    const [url, setUrl] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleRunLighthouse = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/lighthouse', { url });
            setReport(response.data.report);
        } catch (error) {
            console.error('Error running Lighthouse:', error);
        }finally {
            // Set loading to false when the request is complete (success or error)
            setLoading(false);
          }
    };

    return (
        <div className="container mx-auto">
            <h2>Run Lighthouse</h2>
            <form className="flex flex-col w-64">
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
            <button type="button" 
            onClick={handleRunLighthouse}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
            >
                Get Report
            </button>
            </form>
            {report && (
                <div>
                    <h3>Lighthouse Report</h3>
                    <pre>{JSON.stringify(report, null, 2)}</pre>
                </div>
            )}
              {loading && <Loader />}
        </div>
    );
};

export default LighthousePage;
