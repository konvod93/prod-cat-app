import { useContext } from "react";
import CategoriesContext from "../components/context/CategoriesContext";

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context)
    throw new Error(
      "useCategories должен использоваться внутри CategoriesProvider",
    );
  return context;
};
