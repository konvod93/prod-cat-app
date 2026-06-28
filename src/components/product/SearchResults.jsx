// Компонент для отображения результатов поиска и фильтрации товаров

const SearchResults = ({ currentFilters, filteredProducts }) => {
    return (
        <div className="mb-4">
        <h2 className="text-2xl font-bold">
          {currentFilters.productId
            ? "Обранийй товар"
            : currentFilters.search
              ? `Результати пошуку "${currentFilters.search}"`
              : currentFilters.category
                ? `Товари в категорії "${currentFilters.category}"`
                : "Всі товари"}
        </h2>
        <p className="text-gray-600">
          Знайдено товарів: {filteredProducts.length}
        </p>
      </div>
    );
};

export default SearchResults;