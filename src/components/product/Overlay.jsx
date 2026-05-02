const Overlay = ({ product }) => {
    return (
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Link to={`/products/${product.id}`}>
          <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            Подробнее
          </button>
        </Link>
      </div>
    );
};

export default Overlay;