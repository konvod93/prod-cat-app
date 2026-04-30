import ProductRating from "./product/ProductRating";

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
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
                  -{discount}%
                </span>
              </>
            )}
          </div>

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