// pages/api/check-canonicalization.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const canonicalUrl = $('link[rel="canonical"]').attr('href');

    if (canonicalUrl) {
      if (canonicalUrl === url) {
        res.status(200).json({ message: 'Canonicalization is correct.' });
      } else {
        res.status(200).json({ message: 'Canonical URL does not match the current URL.' });
      }
    } else {
      res.status(200).json({ message: 'Canonical tag is missing.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking canonicalization: ' + error.message });
  }
}
