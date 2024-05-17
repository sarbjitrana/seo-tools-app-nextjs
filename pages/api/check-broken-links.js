// pages/api/check-broken-links.js

const axios = require('axios');
const cheerio = require('cheerio');
const { parse, parseUrl } = require('url');
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { websiteUrl } = req.body;
      // Fetch the website's HTML content
      const html = await fetchHtml(websiteUrl);

      // Parse HTML content and find broken links
      const brokenLinks = await findBrokenLinks(html, websiteUrl);

      res.json({ success: true, brokenLinks });
  
      // // Implement your broken links check logic here
      // const brokenLinks = ['https://example.com/broken-link1', 'https://example.com/broken-link2']; // Replace with your actual broken links
  
      // return res.status(200).json({ brokenLinks });
    } catch (error) {
      console.error('Error checking broken links:', error);
      return res.status(200).json({ message: 'Internal Server Error' });
    }
  }
  
// Function to fetch HTML content of a website
async function fetchHtml(websiteUrl) {
  const response = await axios.get(websiteUrl);
  return response.data;
}

// Function to find broken links in HTML content
async function findBrokenLinks(html, websiteUrl) {
  const $ = cheerio.load(html);
  const brokenLinks = [];

  $('a').each((index, element) => {
      const link = $(element).attr('href');

      // Check if the link is relative or absolute
      const parsedLink = parseUrl(link);

      if (!parsedLink.host && !parsedLink.protocol) {
          // Link is relative, construct an absolute URL
          const absoluteLink = parseUrl(link, websiteUrl);

          // Check if the absolute URL is valid
          if (!absoluteLink.host || !absoluteLink.protocol) {
              brokenLinks.push({
                  href: link,
                  status: 'Broken (Invalid URL)',
              });
          }
      } else {
          // Link is absolute, fetch the URL to check its status
          axios
              .get(link)
              .then((response) => {
                  if (response.status === 404) {
                      brokenLinks.push({
                          href: link,
                          status: 'Broken (404 Not Found)',
                      });
                  }
              })
              .catch(() => {
                  brokenLinks.push({
                      href: link,
                      status: 'Broken (Unable to Fetch)',
                  });
              });
      }
  });

  return brokenLinks;
}