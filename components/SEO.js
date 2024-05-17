// components/SEO.js
import Head from 'next/head';
import PropTypes from 'prop-types';

const SEO = ({ title, description, canonical, image }) => {
  const siteName = 'Your Site Name'; // Replace with your site name
  const defaultDescription = 'Your default description goes here.';
  const defaultImage = '/default-image.jpg'; // Replace with your default image path

  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription = description || defaultDescription;
  const pageImage = image || defaultImage;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
    </Head>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
