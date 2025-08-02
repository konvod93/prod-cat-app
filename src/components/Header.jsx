import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCartIcon, UsersIcon } from '@heroicons/react/16/solid';

// Header component for the application

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="flex bg-blue-500 text-white p-4">
      <ul className="flex pb-2 pt-1 space-x-4 gap-4">
        <li>
          <Link to="/" className="hover:text-blue-800">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Products" className="hover:text-blue-800">
            Products
          </Link>
        </li>
        <li>
          <Link to="/Categories" className="hover:text-blue-800">
            Categories
          </Link>
        </li>
        <li>
          <Link to="/About" className="hover:text-blue-800">
            About Us
          </Link>
        </li>
      </ul>
      <div className="relative flex items-center ml-auto">
        <input
          type="text"
          placeholder="Search..."
          className="ml-auto p-2 pl-9 rounded bg-white text-gray-400"
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {/* Heroicons Magnifying Glass */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </span>
      </div>
      {!isLoggedIn ? (
        <div className="flex items-center">
          <button
            className="ml-4 bg-white hover:bg-gray-400 text-blue-500 hover:text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => setIsLoggedIn(true)}
          >
            Login
          </button>
          <button
            className="ml-4 bg-blue-800 hover:bg-gray-400 text-white hover:text-blue-800 px-4 py-2 rounded cursor-pointer"
            onClick={() => setIsLoggedIn(true)}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            className="ml-4 bg-white hover:bg-gray-400 text-blue-500 hover:text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </button>
          <button className="ml-4 relative rounded-full p-2 bg-white hover:bg-gray-400 cursor-pointer group">
            <UsersIcon className="h-6 w-6 text-gray-400 hover:text-white" />
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition">
              My Profile
            </span>
          </button>          
        </div>
      )}
    </header>
  );
};

export default Header;