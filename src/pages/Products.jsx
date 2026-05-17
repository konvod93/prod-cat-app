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
import ActiveFilters from "../components/product/ActiveFilterrs";

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
        <ActiveFilters
          currentFilters={currentFilters}
          clearFilter={clearFilter}
          clearAllFilters={clearAllFilters}
        />
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
