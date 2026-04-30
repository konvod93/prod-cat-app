import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";

const CartButton = ({
  product,
  isAddingToCart,
  productInCart,
  itemQuantity,
  addToCart,
  setIsAddingToCart,
}) => {
  const handleAddToCart = async () => {
    if (!product.inStock || isAddingToCart) return;
    setIsAddingToCart(true);
    await addToCart(product);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={!product.inStock || isAddingToCart}
      className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
        !product.inStock
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : productInCart && !isAddingToCart
            ? "bg-green-600 hover:bg-green-700 text-white"
            : isAddingToCart
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {isAddingToCart ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          Добавляем...
        </>
      ) : productInCart ? (
        <>
          <CheckIcon className="h-5 w-5" />В корзине ({itemQuantity})
        </>
      ) : (
        <>
          <ShoppingCartIcon className="h-5 w-5" />
          Добавить в корзину
        </>
      )}
    </button>
  );
};

export default CartButton;
