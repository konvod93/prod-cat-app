import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import SearchBar from "../components/product/SearchBar";
import Spinner from "../components/product/Spinner";
import FiltersPanel from "../components/product/FiltersPanel";
import ActiveFilters from "../components/product/ActiveFilters";
import SearchResults from "../components/product/SearchResults";
import ProductGrid from "../components/product/ProductGrid";
import Pagination from "../components/product/Pagination";

const Products = ({ showSearchBar = true, mode = "all" }) => {
  const { products, isLoading: isProductsLoading } = useProducts();

  // Получаем уникальные категории из товаров
  const categories = [...new Set(products.map((product) => product.category))];

  // Используем хук для фильтрации товаров
  const {
    filteredProducts,
    paginatedProducts,
    currentPage,
    setCurrentPage,
    totalPages,
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
      <SearchResults
        currentFilters={currentFilters}
        filteredProducts={filteredProducts}
      />

      {/* Сетка товаров */}
      <ProductGrid
        filteredProducts={paginatedProducts}
        currentFilters={currentFilters}
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
      />

      {/* Пагинация */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Products;
