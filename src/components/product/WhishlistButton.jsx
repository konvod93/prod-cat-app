import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useWishlist } from "../../hooks/useWishlist";

const WhishlistButton  = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();  

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };
  
    return (
        <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
      >
        {isInWishlist(product.id) ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-red-500" />
        )}
      </button>
    )
}

export default WhishlistButton;