import { useCart } from "../../hooks/useCart";
import ProductCardImage from "./ProductCardImage";
import ProductInfo from "./ProductInfo";
import { productDiscount } from "../../functions";

const ProductCard = ({ product }) => {
  const { isInCart, getItemQuantity } = useCart();

  const discount = productDiscount(product);
   
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
