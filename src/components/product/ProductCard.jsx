import ProductCardImage from "./ProductCardImage";
import ProductInfo from "./ProductInfo";
import { useProductCart } from "../../hooks/useProductCart";

const ProductCard = ({ product }) => {
  const { productInCart, itemQuantity } = useProductCart(product?.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
      <ProductCardImage
        product={product}
        itemQuantity={itemQuantity}
        productInCart={productInCart}        
      />
      <ProductInfo
        product={product}
        productInCart={productInCart}
        itemQuantity={itemQuantity}
      />
    </div>
  );
};

export default ProductCard;
