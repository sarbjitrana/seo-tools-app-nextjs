// pages/api/check-ranking.js
const axios = require('axios');
// Define your API Key for the search engine's ranking data API here
const apiKey = 'AIzaSyAGhpe6yLJilgAlTisQjisAzjrzp1cwPKE';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { keyword, websiteUrl } = req.body;
  
      // // Implement your ranking check logic here
      // const rankingData = { /* Your ranking data logic here */ };
  
      // return res.status(200).json(rankingData);
      // Call the search engine's ranking data API
      const searchResults = await getSearchResults(keyword);

      // Find the ranking position of the website URL in the search results
      const rankingPosition = findRankingPosition(searchResults, websiteUrl);

      res.json({ success: true, rankingPosition });
    } catch (error) {
      console.error('Error checking ranking:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  // Function to fetch search results for a keyword
async function getSearchResults(keyword) {
  const apiUrl = 'https://api.searchengine.com/v1/search';

  const response = await axios.get(apiUrl, {
      params: {
          q: keyword,
          key: apiKey,
      },
  });

  return response.data.results;
}

// Function to find the ranking position of a website URL in search results
function findRankingPosition(searchResults, websiteUrl) {
  for (let i = 0; i < searchResults.length; i++) {
      if (searchResults[i].url === websiteUrl) {
          return i + 1; // Rank positions start from 1
      }
  }
  return -1; // Website not found in search results
}