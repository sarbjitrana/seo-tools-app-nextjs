import React from 'react';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
  
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to SEO Tools App</h1>
        <p className="text-lg">
          Perform a variety of SEO analyses to optimize your website's performance and visibility.
        </p>
        <p className="text-lg mt-4">
          Choose from the menu on the left to get started with different SEO tools.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Key Metrics:</h2>
        <ol className="list-decimal pl-6">
          <li>
            <strong>Technical SEO:</strong>
            <ul className="list-disc pl-6">
              <li>SSL Certificate: Check if the website has a valid SSL certificate.</li>
              <li>HTTP Status Code: Verify the HTTP status code returned by the server.</li>
              <li>Canonicalization: Ensure proper canonical tags are set.</li>
              <li>URL Redirection: Check if there are any URL redirections.</li>
            </ul>
          </li>
          {/* Include other key metrics in a similar way */}
          <li>
            <strong>Local SEO:</strong>
            <ul className="list-disc pl-6">
              <li>Local Keyword Research: Analyze keywords relevant to a specific location.</li>
              <li>Google My Business Optimization: Optimize the Google My Business listing.</li>
            </ul>
          </li>
          {/* Include other key metrics in a similar way */}
          <li>
            <strong>Competitor Analysis:</strong>
            <ul className="list-disc pl-6">
              <li>Compare Competitors: Compare various metrics with competitors.</li>
            </ul>
          </li>
          {/* Include other key metrics in a similar way */}
        </ol>
      </div>
   
  );
};

export default HomePage;
