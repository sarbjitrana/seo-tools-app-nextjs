// pages/api/analyze.js
const cheerio = require('cheerio');
const axios = require('axios');
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { url } = req.body;

        // Fetch the webpage content
        const response = await axios.get(url);
        const html = response.data;

        // Use Cheerio to parse the HTML
        const $ = cheerio.load(html);

        // Extract the title and meta description
        const title = $('title').text();
        const metaDescription = $('meta[name="description"]').attr('content');

        // Analyze title and meta description
        const titleLength = title.length;
        const metaDescriptionLength = metaDescription ? metaDescription.length : 0;

        // You can add more analysis here, such as keyword optimization and relevancy checks

        const analysis = {
            title,
            titleLength,
            metaDescription,
            metaDescriptionLength,
        };
        //const analysisResult = { /* Your analysis logic here */ };

        return res.status(200).json(analysis);
    } catch (error) {
        console.error('Error analyzing URL:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
