import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { products, searchProducts } from '../../data/mockProducts';
import ProductCard from '../ProductCard';
import { ChevronDownIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Products = ({ showSearchBar = true, mode = 'all' }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    category: '',
    search: '',
    productId: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    sortBy: 'default'
  });

  // Получаем уникальные категории из товаров
  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    // Если mode = 'all' и нет параметров поиска, показываем все товары
    if (mode === 'all' && !searchParams.toString()) {
      setFilteredProducts(products);
      setCurrentFilters({ 
        category: '', 
        search: '', 
        productId: '',
        minPrice: '',
        maxPrice: '',
        minRating: '',
        sortBy: 'default'
      });
      return;
    }

    // Получаем параметры из URL
    const categoryFromUrl = searchParams.get('category');
    const searchFromUrl = searchParams.get('search') || searchParams.get('q');
    const productIdFromUrl = searchParams.get('productId') || searchParams.get('id');
    const minPriceFromUrl = searchParams.get('minPrice');
    const maxPriceFromUrl = searchParams.get('maxPrice');
    const minRatingFromUrl = searchParams.get('minRating');
    const sortByFromUrl = searchParams.get('sortBy');
    
    let filtered = [...products];
    
    // Если передан конкретный товар - показываем только его
    if (productIdFromUrl) {
      filtered = products.filter(product => product.id === parseInt(productIdFromUrl));
      setCurrentFilters(prev => ({ 
        ...prev, 
        productId: productIdFromUrl,
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        minRating: '',
        sortBy: 'default'
      }));
    } else {
      // Применяем поиск
      if (searchFromUrl) {
        filtered = searchProducts(searchFromUrl);
        setSearchQuery(searchFromUrl);
      }
      
      // Применяем фильтр по категории
      if (categoryFromUrl) {
        filtered = filtered.filter(product => 
          product.category.toLowerCase() === categoryFromUrl.toLowerCase()
        );
      }

      // Применяем фильтр по цене
      if (minPriceFromUrl) {
        filtered = filtered.filter(product => product.price >= parseFloat(minPriceFromUrl));
      }
      if (maxPriceFromUrl) {
        filtered = filtered.filter(product => product.price <= parseFloat(maxPriceFromUrl));
      }

      // Применяем фильтр по рейтингу
      if (minRatingFromUrl) {
        filtered = filtered.filter(product => product.rating >= parseFloat(minRatingFromUrl));
      }

      // Применяем сортировку
      if (sortByFromUrl && sortByFromUrl !== 'default') {
        switch (sortByFromUrl) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating-desc':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            break;
        }
      }

      // Обновляем состояние фильтров
      setCurrentFilters({
        category: categoryFromUrl || '',
        search: searchFromUrl || '',
        productId: '',
        minPrice: minPriceFromUrl || '',
        maxPrice: maxPriceFromUrl || '',
        minRating: minRatingFromUrl || '',
        sortBy: sortByFromUrl || 'default'
      });
    }
    
    setFilteredProducts(filtered);
  }, [searchParams, mode]);

  // Функция для обработки поиска
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('search', searchQuery.trim());
      navigate(`/products?${newSearchParams.toString()}`);
    }
  };

  // Функция для применения фильтров
  const applyFilters = (newFilters) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'default' && key !== 'productId') {
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
    const newFilters = { ...currentFilters, [filterName]: filterName === 'sortBy' ? 'default' : '' };
    setCurrentFilters(newFilters);
    applyFilters(newFilters);
  };

  // Функция для очистки всех фильтров
  const clearAllFilters = () => {
    const newFilters = { 
      category: '', 
      search: '', 
      productId: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      sortBy: 'default'
    };
    setCurrentFilters(newFilters);
    setSearchQuery('');
    navigate('/products');
  };

  // Подсчет активных фильтров
  const activeFiltersCount = Object.entries(currentFilters).filter(([key, value]) => 
    value && value !== 'default' && key !== 'productId'
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Панель поиска - показываем только если showSearchBar = true */}
      {showSearchBar && (
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск товаров..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Найти
            </button>
          </form>
        </div>
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
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
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
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Все категории</option>
                {categories.map(category => (
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
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={currentFilters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
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
                onChange={(e) => updateFilter('minRating', e.target.value)}
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
                onChange={(e) => updateFilter('sortBy', e.target.value)}
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
                  onClick={() => clearFilter('search')}
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
                  onClick={() => clearFilter('category')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            {(currentFilters.minPrice || currentFilters.maxPrice) && (
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <span>
                  Цена: {currentFilters.minPrice && `от ${currentFilters.minPrice}`}
                  {currentFilters.minPrice && currentFilters.maxPrice && ' '}
                  {currentFilters.maxPrice && `до ${currentFilters.maxPrice}`}
                </span>
                <button
                  onClick={() => {
                    clearFilter('minPrice');
                    clearFilter('maxPrice');
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
                  onClick={() => clearFilter('minRating')}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            {currentFilters.sortBy && currentFilters.sortBy !== 'default' && (
              <div className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                <span>
                  Сортировка: {
                    currentFilters.sortBy === 'price-asc' ? 'Цена ↑' :
                    currentFilters.sortBy === 'price-desc' ? 'Цена ↓' :
                    currentFilters.sortBy === 'rating-desc' ? 'Рейтинг ↓' :
                    currentFilters.sortBy === 'name-asc' ? 'Название ↑' : 
                    currentFilters.sortBy
                  }
                </span>
                <button
                  onClick={() => clearFilter('sortBy')}
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
            ? 'Выбранный товар'
            : currentFilters.search 
            ? `Результаты поиска "${currentFilters.search}"` 
            : currentFilters.category 
            ? `Товары в категории "${currentFilters.category}"`
            : 'Все товары'
          }
        </h2>
        <p className="text-gray-600">
          Найдено товаров: {filteredProducts.length}
        </p>
      </div>

      {/* Сетка товаров */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
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
              ? 'По заданным фильтрам товары не найдены'
              : 'Товары не найдены'
            }
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