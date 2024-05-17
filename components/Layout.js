// components/Layout.js
import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import PageGrid from './PageGrid';
import SEO from './SEO';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ title, children }) => {
    const pages = [
        //technical SEO checks
        { id: 2, title: 'Technical SEO Analysis', path: '/seo-analysis' },
        // { id: 1, title: 'SEO Backlink Checker', path: '/check-backlinks' },
        { id: 2, title: 'On-Page SEO Analyzer', path: '/on-page-seo' },
        // { id: 3, title: 'SEO Keyword Research', path: '/keyword-suggestions' },
        { id: 4, title: 'SEO Mobile-Friendliness Checker', path: '/check-mobile-friendliness' },
        // { id: 5, title: 'XML Sitemap Generator', path: '/generate-sitemap' },
        { id: 6, title: 'Robots.txt Checker', path: '/check-robots-txt' },
        // { id: 7, title: 'SERP Ranking Checker ', path: '/check-ranking' },
        { id: 8, title: 'Competitor Analysis', path: '/compare-competitors' },
        { id: 9, title: 'Broken Link Checker', path: '/check-broken-links' },
        // { id: 10, title: 'Schema Markup Generator', path: '/generate-schema-markup' },
        { id: 11, title: 'SEO Content Analysis', path: '/analyze-content' },
        // { id: 12, title: 'Local Kseyword Research', path: '/local-keyword-research' },
        // { id: 13, title: 'Lighthouse Performance report', path: '/lighthouse' },
        { id: 1, title: 'Title and Meta Description Checker', path: '/analyse' },
        { id: 1, title: 'Canonicalization Checker', path: '/check-canonicalization' },

        /*
        { id: 6, title: 'Robots.txt Checker', path: '/check-robots-txt' },
        { id: 7, title: 'SERP Ranking Checker ', path: '/check-ranking' },
        { id: 8, title: 'Competitor Analysis', path: '/compare-competitors' } 
        */

    ];
    const pageTitle = 'Optimize Google My Business';
    const pageDescription = 'Improve your online presence with Google My Business optimization.';
    const canonical = 'https://yourwebsite.com/optimize-google-my-business';
    const pageImage = '/optimize-google-my-business-image.jpg';
    return (
        <>
     <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-200 p-4">
          {/* Add your sidebar content here */}
          <Sidebar pages={pages} />
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>

      <Footer />
    </div>
        {/* <div className="min-h-full">
            
             <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <PageGrid pages={pages} />
                </div>
            </main> 
            <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
                    <Sidebar pages={pages} />
                </div>
                <div className="col-span-2">
                    <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
               
            </div>

            <Footer />
        </div> */}
        </>
    );
};

export default Layout;
