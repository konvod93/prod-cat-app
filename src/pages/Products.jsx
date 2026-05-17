import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import {
  ChevronDownIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useProductFilters } from "../hooks/useProductFilters";
import SearchBar from "../components/product/SearchBar";
import Spinner from "../components/product/Spinner";
import FiltersPanel from "../components/product/FiltersPanel";

const Products = ({ showSearchBar = true, mode = "all" }) => {
  const { products, isLoading: isProductsLoading } = useProducts();

  // Получаем уникальные категории из товаров
  const categories = [...new Set(products.map((product) => product.category))];

  // Используем хук для фильтрации товаров
  const {
    filteredProducts,
    currentFilters,
    showFilters,
    setShowFilters,
    searchQuery,
    setSearchQuery,
    updateFilter,
    clearFilter,
    clearAllFilters,
    handleSearch,
    activeFiltersCount,
  } = useProductFilters(products, mode);

  if (isProductsLoading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Панель поиска - показываем только если showSearchBar = true */}
      {showSearchBar && (
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      )}

      {/* Панель фильтров */}
      <FiltersPanel
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        currentFilters={currentFilters}
        updateFilter={updateFilter}
        clearAllFilters={clearAllFilters}
        activeFiltersCount={activeFiltersCount}
        categories={categories}
      />

      {/* Показываем активные фильтры - только если есть фильтры */}
      {activeFiltersCount > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Активные фильтры:</h3>
          <div className="flex flex-wrap gap-2">
            {currentFilters.search && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <span>Поиск: "{currentFilters.search}"</span>
                <button
                  onClick={() => clearFilter("search")}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            {currentFilters.category && (
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <span>Категория: {currentFilters.category}</span>
                <button
                  onClick={() => clearFilter("category")}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            {(currentFilters.minPrice || currentFilters.maxPrice) && (
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <span>
                  Цена:{" "}
                  {currentFilters.minPrice && `от ${currentFilters.minPrice}`}
                  {currentFilters.minPrice && currentFilters.maxPrice && " "}
                  {currentFilters.maxPrice && `до ${currentFilters.maxPrice}`}
                </span>
                <button
                  onClick={() => {
                    clearFilter("minPrice");
                    clearFilter("maxPrice");
                  }}
                  className="ml-2 text-yellow-600 hover:text-yellow-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            {currentFilters.minRating && (
              <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                <span>Рейтинг: от {currentFilters.minRating}</span>
                <button
                  onClick={() => clearFilter("minRating")}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            {currentFilters.sortBy && currentFilters.sortBy !== "default" && (
              <div className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                <span>
                  Сортировка:{" "}
                  {currentFilters.sortBy === "price-asc"
                    ? "Цена ↑"
                    : currentFilters.sortBy === "price-desc"
                      ? "Цена ↓"
                      : currentFilters.sortBy === "rating-desc"
                        ? "Рейтинг ↓"
                        : currentFilters.sortBy === "name-asc"
                          ? "Название ↑"
                          : currentFilters.sortBy}
                </span>
                <button
                  onClick={() => clearFilter("sortBy")}
                  className="ml-2 text-indigo-600 hover:text-indigo-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            {currentFilters.productId && (
              <div className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full">
                <span>Выбранный товар</span>
                <button
                  onClick={clearAllFilters}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Результаты поиска */}
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

      {/* Сетка товаров */}
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
    </div>
  );
};

export default Products;
