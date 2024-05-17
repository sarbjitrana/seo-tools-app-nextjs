// components/PageGrid.js
import React from 'react';
import Link from 'next/link';

const PageGrid = ({ pages }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {pages.map((page) => (
        <div key={page.id} className="p-4 bg-gray-200 rounded-md">
          <Link href={page.path}>
            <a className="text-blue-500 hover:underline">{page.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PageGrid;
