const ProductDetails = ({ product, categories }) => {
  return (
    <>
      {/* Category */}
      <div className="mb-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {categories.find((cat) => cat.name === product.category)?.name ||
            product.category}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 min-h-[3rem]">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm line-clamp-2">
        {product.description}
      </p>
    </>
  );
};

export default ProductDetails;
