import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { products, categories, mockAPI } from '../../data/mockProducts';

const ProductList = () => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Получаем параметры из URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Загрузка продуктов при монтировании компонента или изменении параметров
  useEffect(() => {
    // Проверяем URL параметры при загрузке компонента
    const categoryFromUrl = searchParams.get('category');
    const sortFromUrl = searchParams.get('sort');
    
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
    
    if (sortFromUrl && sortFromUrl !== sortBy) {
      setSortBy(sortFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, sortBy]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const filters = {
        category: selectedCategory === 'all' ? null : selectedCategory,
        sortBy: sortBy
      };
      
      const result = await mockAPI.getProducts(filters);
      setDisplayProducts(result);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Обновляем URL при изменении фильтров
  const updateUrlParams = (category, sort) => {
    const params = new URLSearchParams();
    
    if (category && category !== 'all') {
      params.set('category', category);
    }
    
    if (sort && sort !== 'name') {
      params.set('sort', sort);
    }
    
    // Обновляем URL без перезагрузки страницы
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateUrlParams(category, sortBy);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    updateUrlParams(selectedCategory, sort);
  };

  const handleAddToCart = (product) => {
    console.log('Добавляем в корзину:', product.name);
    // Здесь будет логика добавления в CartContext
    alert(`${product.name} добавлен в корзину!`);
  };

  const handleViewDetails = (product) => {
    console.log('Переход к деталям продукта:', product.id);
    // Здесь будет navigate(`/product/${product.id}`)
    alert(`Открываем страницу: ${product.name}`);
  };

  const handleToggleWishlist = (product, isAdded) => {
    console.log(`${isAdded ? 'Добавляем в' : 'Удаляем из'} wishlist:`, product.name);
    // Здесь будет логика wishlist
  };

  const getProductCount = () => {
    if (selectedCategory === 'all') {
      return products.length;
    }
    return products.filter(p => p.category === selectedCategory).length;
  };

  // Получаем русское название выбранной категории
  const getSelectedCategoryLabel = () => {
    if (selectedCategory === 'all') return 'Все категории';
    const category = categories.find(cat => cat.name === selectedCategory);
    return category ? category.label : selectedCategory;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загружаем продукты...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters and Controls */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory === 'all' ? 'Каталог товаров' : getSelectedCategoryLabel()}
            </h2>
            <span className="text-sm text-gray-600">
              ({getProductCount()} товаров)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            >
              <option value="all">Все категории</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.label}
                </option>
              ))}
            </select>
            
            {/* Sort By Selector */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            >
              <option value="name">По имени</option>
              <option value="price">По цене</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
        </div>

        {/* Breadcrumb or Category Indicator */}
        {selectedCategory !== 'all' && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <span>Главная</span>
            <span>→</span>
            <span>Каталог</span>
            <span>→</span>
            <span className="text-blue-600 font-medium">{getSelectedCategoryLabel()}</span>
            <button
              onClick={() => handleCategoryChange('all')}
              className="ml-2 text-blue-600 hover:text-blue-800 underline"
            >
              Сбросить фильтр
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product} 
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
          />          
        ))}
      </div>

      {/* No Products Found */}
      {displayProducts.length === 0 && (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Нет товаров</h2>
          <p className="text-gray-600">
            К сожалению, в категории "{getSelectedCategoryLabel()}" нет товаров.
          </p>
          <button
            onClick={() => handleCategoryChange('all')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Посмотреть все товары
          </button>
        </div>
      )}
    </div>
  );
} 

export default ProductList;