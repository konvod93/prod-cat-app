import { CATEGORY_COLORS, CATEGORY_ICONS } from "../../constants"

const CategoryManager = ({ categories, categoryForm, setCategoryForm, categoryError, handleAddCategory, deleteCategory }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Категории
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Форма добавления категории */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Добавить категорию
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Название *
                    </label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="Рыбалка"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Иконка
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_ICONS.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() =>
                            setCategoryForm({ ...categoryForm, icon })
                          }
                          className={`text-xl p-1.5 rounded-lg border transition ${
                            categoryForm.icon === icon
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Цвет
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_COLORS.map(({ label, value }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setCategoryForm({ ...categoryForm, color: value })
                          }
                          title={label}
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${value} transition ring-offset-1 ${
                            categoryForm.color === value
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className={`rounded-xl bg-gradient-to-br ${categoryForm.color} p-4 text-white flex items-center gap-3`}
                  >
                    <span className="text-3xl">{categoryForm.icon}</span>
                    <span className="font-semibold">
                      {categoryForm.name || "Название категории"}
                    </span>
                  </div>
                  {categoryError && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                      {categoryError}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Добавить категорию
                  </button>
                </div>
              </div>

              {/* Список категорий */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Существующие{" "}
                  <span className="text-gray-400">({categories.length})</span>
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-3 border rounded-xl p-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-sm flex-shrink-0`}
                      >
                        {cat.icon}
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-800">
                        {cat.name}
                      </span>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-red-400 hover:text-red-600 text-xs border border-red-200 hover:border-red-400 px-2 py-1 rounded-lg transition"
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    )
}

export default CategoryManager