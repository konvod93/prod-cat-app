import { useContext } from "react";
import WishlistContext from "../components/context/WishlistContext";

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error(
      "useWishlist должен использоваться внутри WishlistProvider",
    );
  return context;
};
