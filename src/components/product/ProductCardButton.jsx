import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { handleAddToCart } from "../../functions";

const ProductCardButton = ({
  product,    
  productInCart,  
  itemQuantity,
}) => {

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isLoading } = useCart();
  
  return (
    <>
      {/* Button */}
      <button
        onClick={() =>
          handleAddToCart(product, isAddingToCart, setIsAddingToCart, addToCart)
        }
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
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Добавляем...
          </>
        ) : !product.inStock ? (
          <>
            <ShoppingCartIcon className="h-4 w-4" />
            Нет в наличии
          </>
        ) : productInCart ? (
          <>
            <CheckIcon className="h-4 w-4" />В корзине ({itemQuantity})
          </>
        ) : (
          <>
            <ShoppingCartIcon className="h-4 w-4" />В корзину
          </>
        )}
      </button>
    </>
  );
};

export default ProductCardButton;
