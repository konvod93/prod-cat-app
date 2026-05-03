import { useCart } from "./useCart";

export const useProductCart = (productId) => {
  const { isInCart, getItemQuantity } = useCart();
  return {
    productInCart: isInCart(productId),
    itemQuantity: getItemQuantity(productId),
  };
};
