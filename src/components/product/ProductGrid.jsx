// компонент для отображения сетки товаров, принимает отфильтрованные товары и текущие фильтры для отображения сообщения, если ничего не найдено

import ProductCard from "./ProductCard";

const ProductGrid = ({
  filteredProducts,
  currentFilters,
  activeFiltersCount,
  clearAllFilters,
}) => {
  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Ничего не найдено
          </h3>
          <p className="text-gray-500 mb-4">
            {currentFilters.search
              ? `По запросу "${currentFilters.search}" товары не найдены`
              : activeFiltersCount > 0
                ? "По заданным фильтрам товары не найдены"
                : "Товары не найдены"}
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Показать все товары
          </button>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
