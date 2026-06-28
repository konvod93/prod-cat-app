// Компонент для строки поиска товаров

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
    return (
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук товарів..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Знайти
            </button>
          </form>
        </div>
    )
};

export default SearchBar;