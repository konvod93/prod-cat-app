import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="">
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
    </nav>
)}

export default Navigation;