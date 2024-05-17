// pages/api/seo-analysis.js
import axios from 'axios';
import cheerio from 'cheerio';
import dns from 'dns';

async function checkSslCertificate(url) {
  try {
    const response = await axios.get(url);
    const hasValidSsl = response.request.connection.verifyError === 0;

    return `SSL Certificate is ${hasValidSsl ? 'valid' : 'invalid'}.`;
  } catch (error) {
    return 'Error checking SSL certificate: ' + error.message;
  }
}

async function checkHttpStatusCode(url) {
  try {
    const response = await axios.head(url);
    const statusCode = response.status;

    return `HTTP Status Code: ${statusCode}`;
  } catch (error) {
    return 'Error checking HTTP status code: ' + error.message;
  }
}

async function checkCanonicalization(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const canonicalUrl = $('link[rel="canonical"]').attr('href');

    if (canonicalUrl) {
      if (canonicalUrl === url) {
        return 'Canonicalization is correct.';
      } else {
        return 'Canonical URL does not match the current URL.';
      }
    } else {
      return 'Canonical tag is missing.';
    }
  } catch (error) {
    return 'Error checking canonicalization: ' + error.message;
  }
}

async function checkUrlRedirection(url) {
  try {
    const response = await axios.head(url, { maxRedirects: 5 });
    const finalUrl = response.request.res.responseUrl;

    if (finalUrl === url) {
      return 'No URL redirection.';
    } else {
      return `Redirected to: ${finalUrl}`;
    }
  } catch (error) {
    return 'Error checking URL redirection: ' + error.message;
  }
}

async function checkMobileRendering(url) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X)' },
    });
    const isMobileFriendly =
      response.data.includes('viewport') && response.data.includes('media="only screen and (max-width: 640px)"');

    return `Mobile Rendering: ${isMobileFriendly ? 'Mobile-friendly' : 'Not mobile-friendly'}`;
  } catch (error) {
    return 'Error checking mobile rendering: ' + error.message;
  }
}

async function checkRobotsMetaTag(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const robotsMetaTag = $('meta[name="robots"]').attr('content');

    if (robotsMetaTag) {
      return `Robots Meta Tag: ${robotsMetaTag}`;
    } else {
      return 'Robots Meta Tag is missing.';
    }
  } catch (error) {
    return 'Error checking Robots Meta Tag: ' + error.message;
  }
}

async function analyzeSiteArchitecture(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = $('a');

    // Calculate the depth of each link by counting the number of parent elements.
    const linkDepths = links.map((index, element) => $(element).parents().length).get();
    const maxDepth = Math.max(...linkDepths);

    return `Maximum Page Depth: ${maxDepth}`;
  } catch (error) {
    return 'Error analyzing site architecture: ' + error.message;
  }
}

async function checkBrokenImages(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const images = $('img');
    const brokenImages = images.filter((index, element) => !element.src);

    return `Number of Broken Images: ${brokenImages.length}`;
  } catch (error) {
    return 'Error checking broken images: ' + error.message;
  }
}

async function checkServerResponseTime(url) {
  try {
    const start = Date.now();
    await axios.head(url);
    const end = Date.now();
    const responseTime = end - start;

    return `Server Response Time: ${responseTime} ms`;
  } catch (error) {
    return 'Error checking server response time: ' + error.message;
  }
}

async function checkJavaScriptSEO(url) {
  try {
    const response = await axios.get(url);
    const containsJavaScriptContent = response.data.includes('<script');

    return `JavaScript SEO: ${containsJavaScriptContent ? 'Content accessible' : 'Content not accessible'}`;
  } catch (error) {
    return 'Error checking JavaScript SEO: ' + error.message;
  }
}

async function checkIndexability(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const robotsMetaTag = $('meta[name="robots"]').attr('content');

    if (robotsMetaTag && robotsMetaTag.toLowerCase().includes('noindex')) {
      return 'Page is set to noindex';
    } else {
      return 'Page is indexable';
    }
  } catch (error) {
    return 'Error checking indexability: ' + error.message;
  }
}

async function checkDnsHealth(domain) {
  try {
    const dnsResult = await dns.promises.resolve4(domain);
    return `DNS is healthy. IP Addresses: ${dnsResult.join(', ')}`;
  } catch (error) {
    return 'Error checking DNS health: ' + error.message;
  }
}

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    const sslCertificateResult = await checkSslCertificate(url);
    const httpStatusCodeResult = await checkHttpStatusCode(url);
    const canonicalizationResult = await checkCanonicalization(url);
    const urlRedirectionResult = await checkUrlRedirection(url);
    const mobileRenderingResult = await checkMobileRendering(url);
    const robotsMetaTagResult = await checkRobotsMetaTag(url);
    const siteArchitectureResult = await analyzeSiteArchitecture(url);
    const brokenImagesResult = await checkBrokenImages(url);
    const serverResponseTimeResult = await checkServerResponseTime(url);
    const javascriptSeoResult = await checkJavaScriptSEO(url);
    const indexabilityResult = await checkIndexability(url);
    const dnsHealthResult = await checkDnsHealth(new URL(url).hostname);

    res.status(200).json({
      sslCertificateResult,
      httpStatusCodeResult,
      canonicalizationResult,
      urlRedirectionResult,
      mobileRenderingResult,
      robotsMetaTagResult,
      siteArchitectureResult,
      brokenImagesResult,
      serverResponseTimeResult,
      javascriptSeoResult,
      indexabilityResult,
      dnsHealthResult,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing SEO: ' + error.message });
  }
}
