import { formatProductPrice } from "../../functions";

const ProductPrice = ({ product }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {formatProductPrice(product.price)}
      </span>
      {product.originalPrice && product.originalPrice > product.price && (
        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
          {formatProductPrice(product.originalPrice)}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;