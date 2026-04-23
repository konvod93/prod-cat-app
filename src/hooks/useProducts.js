import { useContext } from "react";
import ProductsContext from "../components/context/ProductsContext";

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error(
      "useProducts должен использоваться внутри ProductsProvider",
    );
  return context;
};
