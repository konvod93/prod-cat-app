
const Header = () => {
  return (
    <header className="flex bg-blue-500 text-white p-4">
      <ul className="flex pb-2 pt-1 space-x-4 gap-4">
        <li>Home</li>
        <li>Products</li>
        <li>Categories</li>
        <li>About Us</li>
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
      <button className="ml-4 bg-white hover:bg-gray-400 text-blue-500 hover:text-white px-4 py-2 rounded cursor-pointer">
        Login
      </button>
      <button className="ml-4 bg-blue-800 hover:bg-gray-400 text-white hover:text-blue-800 px-4 py-2 rounded cussor-pointer">
        Sign Up
      </button>
    </header>
  );
};

export default Header;