// pages/api/onPageSEO.js
const axios = require('axios');
const cheerio = require('cheerio');
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { url } = req.body;
  
        // Fetch the webpage content
        const response = await axios.get(url);
        const html = response.data;

        // Use Cheerio to parse the HTML
        const $ = cheerio.load(html);

        // Analyze header tags (H1, H2, etc.)
        const headerTags = {};
        $('h1, h2, h3, h4, h5, h6').each((index, element) => {
            const tagName = $(element).prop('tagName');
            const text = $(element).text();
            headerTags[tagName] = text;
        });

        // Analyze image alt attributes
        const imageAltAttributes = [];
        $('img').each((index, element) => {
            const alt = $(element).attr('alt');
            imageAltAttributes.push(alt || 'No alt attribute');
        });

        // Analyze internal and external links
        const links = {
            internal: [],
            external: [],
        };
        $('a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                if (href.startsWith('/') || href.startsWith(url)) {
                    links.internal.push(href);
                } else {
                    links.external.push(href);
                }
            }
        });

        const analysis = {
            headerTags,
            imageAltAttributes,
            links,
        };
  
        res.status(200).json(analysis);
      } catch (error) {
        console.error('Error analyzing On-Page SEO:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  