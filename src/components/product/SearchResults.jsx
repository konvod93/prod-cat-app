// Компонент для отображения результатов поиска и фильтрации товаров

const SearchResults = ({ currentFilters, filteredProducts }) => {
    return (
        <div className="mb-4">
        <h2 className="text-2xl font-bold">
          {currentFilters.productId
            ? "Выбранный товар"
            : currentFilters.search
              ? `Результаты поиска "${currentFilters.search}"`
              : currentFilters.category
                ? `Товары в категории "${currentFilters.category}"`
                : "Все товары"}
        </h2>
        <p className="text-gray-600">
          Найдено товаров: {filteredProducts.length}
        </p>
      </div>
    );
};

export default SearchResults;