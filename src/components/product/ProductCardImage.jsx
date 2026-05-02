import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
import Badges from "./Badges";
import WhishlistButton from "./WhishlistButton";
import ProductImage from "./ProductImage";

const ProductCardImage = ({
  product,
  isInWishlist,
  onToggleWishlist,
  itemQuantity,
  productInCart,
  discount,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
      {/* Badges */}
      <Badges
        product={product}
        discount={discount}
        itemQuantity={itemQuantity}
        productInCart={productInCart}
      />

      {/* Wishlist Button */}
      <WhishlistButton
        isInWishlist={isInWishlist}
        onToggleWishlist={onToggleWishlist}
      />      

      {/* Product Image */}
      
      <ProductImage
        product={product}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
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

export default ProductCardImage;
