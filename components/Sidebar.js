// components/Sidebar.js
import React from 'react';
import Link from 'next/link';

const Sidebar = ({ pages }) => {
  return (
    <aside className="bg-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-4">Technical SEO Tools</h2>
      <nav>
        <ul>
          {pages.map((page) => (
            <li key={page.id} className="mb-2">
              <Link href={page.path} className="text-blue-500 hover:underline">
            {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
