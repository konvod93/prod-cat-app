import { useState } from "react";
import { useCart } from "../hooks/useCart";
import ProductImage from "./product/ProductImage";
import ProductInfo from "./product/ProductInfo";
import { useWishlist } from "../hooks/useWhishlist";

const ProductCard = ({ product }) => {
  
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isInCart, getItemQuantity, isLoading } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); 

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (product.inStock && !isAddingToCart) {
      setIsAddingToCart(true);
      await addToCart(product);
      setTimeout(() => setIsAddingToCart(false), 1000);
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const itemQuantity = getItemQuantity(product.id);
  const productInCart = isInCart(product.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
      <ProductImage
        product={product}
        isInWishlist={isInWishlist(product.id)}
        onToggleWishlist={handleToggleWishlist}
        itemQuantity={itemQuantity}
        productInCart={productInCart}
        discount={discount}
      />
      <ProductInfo
        product={product}
        productInCart={productInCart}
        itemQuantity={itemQuantity}
        isAddingToCart={isAddingToCart}
        isLoading={isLoading}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductCard;