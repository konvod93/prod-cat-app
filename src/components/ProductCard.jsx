import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product, onAddToCart, onViewDetails, onToggleWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Предотвращаем переход на детальную страницу
    if (product.inStock) {
      onAddToCart?.(product);
      // Можно добавить toast уведомление
      console.log(`Добавлен в корзину: ${product.name}`);
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    setIsInWishlist(!isInWishlist);
    onToggleWishlist?.(product, !isInWishlist);
  };

  const handleViewDetails = () => {
    onViewDetails?.(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  const discount = calculateDiscount();

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              НЕТ В НАЛИЧИИ
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200"
        >
          {isInWishlist ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
          )}
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400">📷</span>
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
          >
            <EyeIcon className="h-4 w-4" />
            Подробнее
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {categories.find(cat => cat.name === product.category)?.label || product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
            product.inStock
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCartIcon className="h-4 w-4" />
          {product.inStock ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;