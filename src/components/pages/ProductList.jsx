import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import { products, categories, mockAPI } from '../../data/mockProducts';

const ProductList = () => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Загрузка продуктов при монтировании компонента
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
              Каталог товаров
            </h2>
            <span className="text-sm text-gray-600">
              ({getProductCount()} товаров)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            >
              <option value="name">По имени</option>
              <option value="price">По цене</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
        </div>
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
          <p className="text-gray-600">К сожалению, в этой категории нет товаров.</p>
        </div>
      )}
    </div>
  );
} 

export default ProductList;

