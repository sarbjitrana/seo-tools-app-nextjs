// pages/api/generate-sitemap.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { url } = req.body;

    // Generate the XML sitemap
    const xmlSitemap = generateXmlSitemap(url);

    // Set the response headers for downloading
    res.setHeader('Content-Disposition', 'attachment; filename=sitemap.xml');
    res.setHeader('Content-Type', 'application/xml');
    
    // Send the XML sitemap as the response
    res.send(xmlSitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Function to generate the XML sitemap
function generateXmlSitemap(url) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.5</priority>
      </url>
  </urlset>`;

  return xml;
}
