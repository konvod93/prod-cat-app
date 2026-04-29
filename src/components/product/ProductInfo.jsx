import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useCategories } from "../../hooks/useCategories";
import ProductCardButton from "./ProductCardButton";
import ProductRating from "./ProductRating";

const formatPrice = (price) => {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "UAH" }).format(price);
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
        <ProductRating product={product} />

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
        <ProductCardButton
          product={product}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
          productInCart={productInCart}
          isAddingToCart={isAddingToCart}
          itemQuantity={itemQuantity}
        />
      </div>
    </div>
  );
};

export default ProductInfo;