const ProductTags = ({ product }) => {
  return (
    <>
      {product.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductTags;