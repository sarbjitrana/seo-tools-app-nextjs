// pages/api/check-robots-txt.js
import axios from 'axios';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { url } = req.body;
  
     // Fetch the robots.txt file
     const robotsTxtUrl = `${url}/robots.txt`;
     const response = await axios.get(robotsTxtUrl);

     // Parse the robots.txt content
     const robotsTxtContent = response.data;

     // Analyze the robots.txt file
     const disallowedPaths = parseRobotsTxt(robotsTxtContent);
     res.json({ success: true, disallowedPaths });
      // const robotsTxtContent = 'User-agent: *\nDisallow: /'; // Replace with your actual robots.txt content
  
      // return res.status(200).json({ robotsTxtContent });
    } catch (error) {
      console.error('Error checking robots.txt:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  // Function to parse robots.txt content and extract disallowed paths
function parseRobotsTxt(content) {
  const disallowedPaths = [];
  const lines = content.split('\n');
  let isUserAgentWildcard = false;

  for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('User-agent:')) {
          isUserAgentWildcard = trimmedLine === 'User-agent: *';
      } else if (isUserAgentWildcard && trimmedLine.startsWith('Disallow:')) {
          const disallowedPath = trimmedLine.replace('Disallow:', '').trim();
          disallowedPaths.push(disallowedPath);
      }
  }

  return disallowedPaths;
}