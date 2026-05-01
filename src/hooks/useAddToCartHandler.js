import { useState } from "react";
import { useCart } from "./useCart";
import { handleAddToCart } from "../functions";

export const useAddToCartHandler = (product) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isLoading } = useCart();
  handleAddToCart(product, isAddingToCart, setIsAddingToCart, addToCart);

  return { isAddingToCart, isLoading };
};
