import { useContext } from "react";
import CartContext from "../components/context/CartContext";

// Хук для использования контекста корзины
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart должен использоваться внутри CartProvider");
  }

  return context;
};
