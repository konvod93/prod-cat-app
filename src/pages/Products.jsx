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
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FunnelIcon className="h-5 w-5" />
            Фильтры
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Очистить все
            </button>
          )}
        </div>

        {/* Фильтры */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Фильтр по категории */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                value={currentFilters.category}
                onChange={(e) => updateFilter("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Все категории</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Фильтр по цене */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="От"
                  value={currentFilters.minPrice}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={currentFilters.maxPrice}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Фильтр по рейтингу */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Минимальный рейтинг
              </label>
              <select
                value={currentFilters.minRating}
                onChange={(e) => updateFilter("minRating", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Любой рейтинг</option>
                <option value="4">4+ звезды</option>
                <option value="4.5">4.5+ звезд</option>
                <option value="5">5 звезд</option>
              </select>
            </div>

            {/* Сортировка */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сортировка
              </label>
              <select
                value={currentFilters.sortBy}
                onChange={(e) => updateFilter("sortBy", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="rating-desc">Рейтинг: по убыванию</option>
                <option value="name-asc">Название: А-Я</option>
              </select>
            </div>
          </div>
        )}
      </div>

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
