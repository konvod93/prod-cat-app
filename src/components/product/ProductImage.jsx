import { useState } from "react";
import { HeartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";

const ProductImage = ({ product, isInWishlist, onToggleWishlist, itemQuantity, productInCart, discount }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">NEW</span>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">-{discount}%</span>
        )}
        {!product.inStock && (
          <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold">НЕТ В НАЛИЧИИ</span>
        )}
        {productInCart && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            В КОРЗИНЕ ({itemQuantity})
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={onToggleWishlist}
        className="absolute top-2 right-2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
      >
        {isInWishlist ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-red-500" />
        )}
      </button>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500">📷</span>
        </div>
      )}

      {/* Overlay */}
      <Overlay product={product} />
    </div>
  );
};

export default ProductImage;