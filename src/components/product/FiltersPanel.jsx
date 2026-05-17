// Компонент для отображения панели фильтров

import { FunnelIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const FiltersPanel = ({
  showFilters,
  setShowFilters,
  currentFilters,
  updateFilter,
  clearAllFilters,
  activeFiltersCount,
  categories,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <FunnelIcon className="h-5 w-5" />
          Фильтры
          {activeFiltersCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
          />
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Очистить все
          </button>
        )}
      </div>

      {/* Фильтры */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Фильтр по категории */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категория
            </label>
            <select
              value={currentFilters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все категории</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Фильтр по цене */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цена
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="От"
                value={currentFilters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="До"
                value={currentFilters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Фильтр по рейтингу */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Минимальный рейтинг
            </label>
            <select
              value={currentFilters.minRating}
              onChange={(e) => updateFilter("minRating", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Любой рейтинг</option>
              <option value="4">4+ звезды</option>
              <option value="4.5">4.5+ звезд</option>
              <option value="5">5 звезд</option>
            </select>
          </div>

          {/* Сортировка */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сортировка
            </label>
            <select
              value={currentFilters.sortBy}
              onChange={(e) => updateFilter("sortBy", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="rating-desc">Рейтинг: по убыванию</option>
              <option value="name-asc">Название: А-Я</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;
