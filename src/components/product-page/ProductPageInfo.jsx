import ProductRating from "../product/ProductRating";
import ProductPagePrice from "./ProductPagePrice";

const ProductPageInfo = ({ product, discount }) => {
    return (
        <>
          {/* Категория */}          
          <span className="text-sm text-blue-600 uppercase tracking-wide font-medium mb-2">
            {product.category}
          </span>

          {/* Название */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {product.name}
          </h1>

          {/* Краткое описание */}
          {product.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {product.description}
            </p>
          )}

          {/* Рейтинг */}
          {product.rating > 0 && (
            <ProductRating product={product} />
          )}

          {/* Цена */}
          <ProductPagePrice product={product} discount={discount} />          

          {/* Наличие */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 font-medium">✓ В наличии</span>
            ) : (
              <span className="text-red-500 font-medium">✗ Нет в наличии</span>
            )}
          </div>
        </>
    )
}

export default ProductPageInfo;