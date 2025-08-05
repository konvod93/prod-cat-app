// Добавьте этот код в компонент Products.jsx

import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { products, searchProducts } from '../../data/mockProducts';
import ProductCard from '../ProductCard';

const Products = ({ showSearchBar = true, mode = 'all' }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilters, setCurrentFilters] = useState({
    category: '',
    search: '',
    productId: '', // добавляем для отдельного товара
  });

  useEffect(() => {
    // Если mode = 'all' и нет параметров поиска, показываем все товары
    if (mode === 'all' && !searchParams.toString()) {
      setFilteredProducts(products);
      setCurrentFilters({ category: '', search: '', productId: '' });
      return;
    }

    // Получаем параметры из URL
    const categoryFromUrl = searchParams.get('category');
    const searchFromUrl = searchParams.get('search') || searchParams.get('q');
    const productIdFromUrl = searchParams.get('productId') || searchParams.get('id');
    
    let filtered = [...products];
    
    // Если передан конкретный товар - показываем только его
    if (productIdFromUrl) {
      filtered = products.filter(product => product.id === parseInt(productIdFromUrl));
      setCurrentFilters(prev => ({ 
        ...prev, 
        productId: productIdFromUrl,
        search: '',
        category: ''
      }));
    } else {
      // Применяем поиск
      if (searchFromUrl) {
        filtered = searchProducts(searchFromUrl);
        setSearchQuery(searchFromUrl);
        setCurrentFilters(prev => ({ 
          ...prev, 
          search: searchFromUrl,
          productId: '',
          category: ''
        }));
      }
      
      // Применяем фильтр по категории
      if (categoryFromUrl && !searchFromUrl) {
        filtered = filtered.filter(product => 
          product.category.toLowerCase() === categoryFromUrl.toLowerCase()
        );
        setCurrentFilters(prev => ({ 
          ...prev, 
          category: categoryFromUrl,
          productId: '',
          search: ''
        }));
      }
    }
    
    setFilteredProducts(filtered);
  }, [searchParams, mode]);

  // Функция для обработки поиска
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('search', searchQuery.trim());
      navigate(`/products?${newSearchParams.toString()}`);
    }
  };

  // Функция для очистки поиска
  const clearSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('search');
    newSearchParams.delete('q');
    setSearchQuery('');
    navigate(`/products?${newSearchParams.toString()}`);
  };

  // Функция для очистки категории
  const clearCategory = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('category');
    navigate(`/products?${newSearchParams.toString()}`);
  };

  // Функция для очистки всех фильтров
  const clearAllFilters = () => {
    setCurrentFilters({ category: '', search: '', productId: '' });
    setSearchQuery('');
    navigate('/products');
  };

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

      {/* Показываем активные фильтры - только если есть фильтры */}
      {(currentFilters.search || currentFilters.category || currentFilters.productId) && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Активные фильтры:</h3>
          <div className="flex flex-wrap gap-2">
            {currentFilters.search && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <span>Поиск: "{currentFilters.search}"</span>
                <button
                  onClick={clearSearch}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            )}
            {currentFilters.category && (
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <span>Категория: {currentFilters.category}</span>
                <button
                  onClick={clearCategory}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </div>
            )}
            {currentFilters.productId && (
              <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                <span>Выбранный товар</span>
                <button
                  onClick={clearAllFilters}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
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
              : currentFilters.category
              ? 'В данной категории пока нет товаров'
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