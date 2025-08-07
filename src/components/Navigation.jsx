import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center">
      {/* Бургер-иконка — только на мобильных */}
      <div className="h-8 w-8 mr-4 cursor-pointer hover:text-gray-500 hover:scale-110 transition duration-200 lg:hidden">
        {isOpen ? (
          <XMarkIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <Bars3Icon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

            {/* Меню — мобильное, по клику */}
      {isOpen && (
        <ul className="absolute top-14 left-0 w-1/2 bg-gray-800 shadow-md opacity-75 flex flex-col items-center space-y-4 py-4 lg:hidden">
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
      )}



      <ul className="hidden lg:flex pb-2 pt-1 space-x-4 gap-4">
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
    </nav>
  );
};

export default Navigation;