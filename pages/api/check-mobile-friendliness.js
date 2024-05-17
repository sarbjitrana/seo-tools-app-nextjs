// pages/api/check-mobile-friendliness.js
const axios = require('axios');
// Define your Google API Key here
const googleApiKey = 'AIzaSyAGhpe6yLJilgAlTisQjisAzjrzp1cwPKE';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { url } = req.body;
  
      // Call the Google Mobile-Friendly Test API
      const response = await axios.post(`https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=${googleApiKey}`, {
        url,
    });

    // Extract mobile-friendliness result and suggestions
    const data = response.data;
    const mobileFriendliness = data.mobileFriendliness;
    const mobileFriendlyIssues = data.mobileFriendlyIssues || [];

    const analysis = {
        mobileFriendliness,
        mobileFriendlyIssues,
    };
      //const mobileFriendliness = true; // Replace with your actual logic
  
      return res.status(200).json({ analysis });
    } catch (error) {
      console.error('Error checking mobile friendliness:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  