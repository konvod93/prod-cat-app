import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useCategories } from "../../hooks/useCategories";

const renderStars = (rating) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  for (let i = 0; i < full; i++) stars.push(<span key={i} className="text-yellow-400">★</span>);
  if (half) stars.push(<span key="half" className="text-yellow-400">☆</span>);
  for (let i = 0; i < 5 - Math.ceil(rating); i++) stars.push(<span key={`e${i}`} className="text-gray-300 dark:text-gray-500">★</span>);
  return stars;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD" }).format(price);
};

const ProductInfo = ({ product, productInCart, itemQuantity, isAddingToCart, isLoading, onAddToCart }) => {
  const { categories } = useCategories();

  return (
    <div className="p-4 flex flex-col flex-1">
      {/* Category */}
      <div className="mb-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {categories.find(cat => cat.name === product.category)?.name || product.category}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 min-h-[3rem]">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm line-clamp-2">
        {product.description}
      </p>

      <div className="mt-auto">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          onClick={onAddToCart}
          disabled={!product.inStock || isAddingToCart || isLoading}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            !product.inStock
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : productInCart && !isAddingToCart
              ? "bg-green-600 hover:bg-green-700 text-white"
              : isAddingToCart
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isAddingToCart ? (
            <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>Добавляем...</>
          ) : !product.inStock ? (
            <><ShoppingCartIcon className="h-4 w-4" />Нет в наличии</>
          ) : productInCart ? (
            <><CheckIcon className="h-4 w-4" />В корзине ({itemQuantity})</>
          ) : (
            <><ShoppingCartIcon className="h-4 w-4" />В корзину</>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;