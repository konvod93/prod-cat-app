import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useCategories } from "../../hooks/useCategories";
import ProductCardButton from "./ProductCardButton";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import ProductDetails from "./ProductDetails";

const ProductInfo = ({
  product,
  productInCart,
  itemQuantity,
  isAddingToCart,
  isLoading,
  onAddToCart,
}) => {
  const { categories } = useCategories();

  return (
    <div className="p-4 flex flex-col flex-1">
      <ProductDetails product={product} categories={categories} />
      <div className="mt-auto">
        {/* Rating */}
        <ProductRating product={product} />
        {/* Price */}
        <ProductPrice product={product} />
        {/* Button */}
        <ProductCardButton
          product={product}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
          productInCart={productInCart}
          isAddingToCart={isAddingToCart}
          itemQuantity={itemQuantity}
        />
      </div>
    </div>
  );
};

export default ProductInfo;