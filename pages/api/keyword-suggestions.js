// pages/api/keyword-suggestions.js
const axios = require('axios');
// Define your Google Cloud API Key here
const googleApiKey = 'AIzaSyAGhpe6yLJilgAlTisQjisAzjrzp1cwPKE';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { keyword } = req.body;
   // Call the Google Keyword Planner API
   const response = await axios.post('https://content.googleapis.com/youtube/v3/search', {
    key: googleApiKey,
    q: keyword,
    part: 'snippet',
    type: 'video',
    maxResults: 10,
});

// Extract keyword suggestions, search volume, and competition level from the API response
const suggestionss = response.data.items.map((item) => item.snippet.title);
const searchVolume = 100; // Replace with actual search volume data (if available)
const competitionLevel = 'Low'; // Replace with actual competition data (if available)

const keywordData = {
    keyword,
    suggestionss,
    searchVolume,
    competitionLevel,
};
      // Implement your keyword suggestions logic here
      const suggestions = ['suggestion1', 'suggestion2', 'suggestion3'];
  
      return res.status(200).json({ suggestions,keywordData });
    } catch (error) {
      console.error('Error getting keyword suggestions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  