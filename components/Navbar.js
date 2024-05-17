// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
      Your Logo
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/">
            Home
          </Link>
          <Link href="/onPageSEO">
            On-Page SEO
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
