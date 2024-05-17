// pages/api/analyze-content.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { content, keywords } = req.body;
       // Analyze content for keyword density and readability
       const analysis = analyzeContent(content, keywords);

       res.json({ success: true, analysis });
  
      // // Implement your content analysis logic here
      // const analysisResult = { /* Your analysis result object */ };
  
      // return res.status(200).json(analysisResult);
    } catch (error) {
      console.error('Error analyzing content:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Function to analyze content for keyword density and readability
function analyzeContent(content, keywords) {
  // Implement content analysis logic here
  // Example: Calculate keyword density and check readability

  const wordCount = content.split(/\s+/).length;
  const keywordDensity = (keywords.length / wordCount) * 100;

  let readability = 'Unknown';

  if (wordCount < 300) {
      readability = 'Difficult';
  } else if (wordCount < 600) {
      readability = 'Moderate';
  } else {
      readability = 'Easy';
  }

  return {
      wordCount,
      keywordDensity: keywordDensity.toFixed(2) + '%',
      readability,
      suggestions: 'Consider adding more content, improving readability, and optimizing keywords.',
  };
}
  