import { useCart } from "../hooks/useCart";
import ProductCardImage from "./product/ProductCardImage";
import ProductInfo from "./product/ProductInfo";

const ProductCard = ({ product }) => {
  const { isInCart, getItemQuantity } = useCart();

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const itemQuantity = getItemQuantity(product.id);
  const productInCart = isInCart(product.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
      <ProductCardImage
        product={product}
        itemQuantity={itemQuantity}
        productInCart={productInCart}
        discount={discount}
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
