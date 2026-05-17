import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const useProductFilters = (products, mode) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    category: "",
    search: "",
    productId: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    sortBy: "default",
  });
  // Режимы: 'all' - показывать все товары, 'search' - только по поиску, 'category' - только по категории, 'product' - только конкретный товар
  useEffect(() => {
    // Если mode = 'all' и нет параметров поиска, показываем все товары
    if (mode === "all" && !searchParams.toString()) {
      setFilteredProducts(products);
      setCurrentFilters({
        category: "",
        search: "",
        productId: "",
        minPrice: "",
        maxPrice: "",
        minRating: "",
        sortBy: "default",
      });
      return;
    }

    // Получаем параметры из URL
    const categoryFromUrl = searchParams.get("category");
    const searchFromUrl = searchParams.get("search") || searchParams.get("q");
    const productIdFromUrl =
      searchParams.get("productId") || searchParams.get("id");
    const minPriceFromUrl = searchParams.get("minPrice");
    const maxPriceFromUrl = searchParams.get("maxPrice");
    const minRatingFromUrl = searchParams.get("minRating");
    const sortByFromUrl = searchParams.get("sortBy");

    let filtered = [...products];

    // Если передан конкретный товар - показываем только его
    if (productIdFromUrl) {
      filtered = products.filter(
        (product) => product.id === parseInt(productIdFromUrl),
      );
      setCurrentFilters((prev) => ({
        ...prev,
        productId: productIdFromUrl,
        search: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        minRating: "",
        sortBy: "default",
      }));
    } else {
      // Применяем поиск
      if (searchFromUrl) {
        filtered = products.filter(
          (p) =>
            p.name.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
            p.description
              ?.toLowerCase()
              .includes(searchFromUrl.toLowerCase()) ||
            p.tags?.some((tag) =>
              tag.toLowerCase().includes(searchFromUrl.toLowerCase()),
            ),
        );
      }

      // Применяем фильтр по категории
      if (categoryFromUrl) {
        filtered = filtered.filter(
          (product) =>
            product.category.toLowerCase() === categoryFromUrl.toLowerCase(),
        );
      }

      // Применяем фильтр по цене
      if (minPriceFromUrl) {
        filtered = filtered.filter(
          (product) => product.price >= parseFloat(minPriceFromUrl),
        );
      }
      if (maxPriceFromUrl) {
        filtered = filtered.filter(
          (product) => product.price <= parseFloat(maxPriceFromUrl),
        );
      }

      // Применяем фильтр по рейтингу
      if (minRatingFromUrl) {
        filtered = filtered.filter(
          (product) => product.rating >= parseFloat(minRatingFromUrl),
        );
      }

      // Применяем сортировку
      if (sortByFromUrl && sortByFromUrl !== "default") {
        switch (sortByFromUrl) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "rating-desc":
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            break;
        }
      }

      // Обновляем состояние фильтров
      setCurrentFilters({
        category: categoryFromUrl || "",
        search: searchFromUrl || "",
        productId: "",
        minPrice: minPriceFromUrl || "",
        maxPrice: maxPriceFromUrl || "",
        minRating: minRatingFromUrl || "",
        sortBy: sortByFromUrl || "default",
      });
    }

    setFilteredProducts(filtered);
  }, [searchParams, mode, products]);

  // Функция для обработки поиска
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("search", searchQuery.trim());
      navigate(`/products?${newSearchParams.toString()}`);
    }
  };

  // Функция для применения фильтров
  const applyFilters = (newFilters) => {
    const searchParams = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "default" && key !== "productId") {
        searchParams.set(key, value);
      }
    });

    navigate(`/products?${searchParams.toString()}`);
  };

  // Функция для обновления фильтра
  const updateFilter = (filterName, value) => {
    const newFilters = { ...currentFilters, [filterName]: value };
    setCurrentFilters(newFilters);
    applyFilters(newFilters);
  };

  // Функция для очистки конкретного фильтра
  const clearFilter = (filterName) => {
    const newFilters = {
      ...currentFilters,
      [filterName]: filterName === "sortBy" ? "default" : "",
    };
    setCurrentFilters(newFilters);
    applyFilters(newFilters);
  };

  // Функция для очистки всех фильтров
  const clearAllFilters = () => {
    const newFilters = {
      category: "",
      search: "",
      productId: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      sortBy: "default",
    };
    setCurrentFilters(newFilters);
    setSearchQuery("");
    navigate("/products");
  };

  // Подсчет активных фильтров
  const activeFiltersCount = Object.entries(currentFilters).filter(
    ([key, value]) => value && value !== "default" && key !== "productId",
  ).length;

  return {
    activeFiltersCount,
    currentFilters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    applyFilters,
    searchQuery,
    setSearchQuery,
    handleSearch,
    filteredProducts,
    showFilters,
    setShowFilters,
  };
};
