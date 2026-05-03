import { formatProductPrice } from "../../functions";

const ProductPagePrice = ({ product, discount }) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {formatProductPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  {formatProductPrice(product.originalPrice)}
                </span>
                <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
                  -{discount}%
                </span>
              </>
            )}
          </div>
    )
}

export default ProductPagePrice;