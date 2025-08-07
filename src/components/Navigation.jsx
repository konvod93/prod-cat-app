import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline'

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center">
      <Bars3Icon className="h-8 w-8 mr-4 cursor-pointer hover:text-gray-500 hover:scale-110 transition duration-200 lg:hidden" />
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