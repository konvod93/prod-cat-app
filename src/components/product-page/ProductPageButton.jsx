import { ArrowLeftIcon } from "@heroicons/react/24/outline";


const ProductPageButton = ({ navigate}) => {
    
    return(
        <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Назад
      </button>
    )
}

export default ProductPageButton;