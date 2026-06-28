// Компонент для отображения активных фильтров и возможности их очистки

import { XMarkIcon } from "@heroicons/react/24/outline";

const ActiveFilters = ({ currentFilters, clearFilter, clearAllFilters }) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Активні фільтри:</h3>
      <div className="flex flex-wrap gap-2">
        {currentFilters.search && (
          <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            <span>Пошук: "{currentFilters.search}"</span>
            <button
              onClick={() => clearFilter("search")}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {currentFilters.category && (
          <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <span>Категорія: {currentFilters.category}</span>
            <button
              onClick={() => clearFilter("category")}
              className="ml-2 text-green-600 hover:text-green-800"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {(currentFilters.minPrice || currentFilters.maxPrice) && (
          <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            <span>
              Ціна: {currentFilters.minPrice && `від ${currentFilters.minPrice}`}
              {currentFilters.minPrice && currentFilters.maxPrice && " "}
              {currentFilters.maxPrice && `до ${currentFilters.maxPrice}`}
            </span>
            <button
              onClick={() => {
                clearFilter("minPrice");
                clearFilter("maxPrice");
              }}
              className="ml-2 text-yellow-600 hover:text-yellow-800"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {currentFilters.minRating && (
          <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
            <span>Рейтинг: від {currentFilters.minRating}</span>
            <button
              onClick={() => clearFilter("minRating")}
              className="ml-2 text-purple-600 hover:text-purple-800"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {currentFilters.sortBy && currentFilters.sortBy !== "default" && (
          <div className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
            <span>
              Сортування:{" "}
              {currentFilters.sortBy === "price-asc"
                ? "Ціна ↑"
                : currentFilters.sortBy === "price-desc"
                  ? "Ціна ↓"
                  : currentFilters.sortBy === "rating-desc"
                    ? "Рейтинг ↓"
                    : currentFilters.sortBy === "name-asc"
                      ? "Назва ↑"
                      : currentFilters.sortBy}
            </span>
            <button
              onClick={() => clearFilter("sortBy")}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {currentFilters.productId && (
          <div className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full">
            <span>Обраний товар</span>
            <button
              onClick={clearAllFilters}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;