const FiltersPanel = ({
  t,
  filters,
  categories,
  locale,
  onFilterChange,
  onReset,
}) => {
  const [minPrice, maxPrice] = filters.priceRange;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 shadow-md sm:shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">
            {t("Catégorie")}
          </label>
          <select
            value={filters.category}
            onChange={(event) =>
              onFilterChange("category", event.target.value)
            }
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#D4AF37] text-xs sm:text-sm"
          >
            <option value="">{t("Touteslescatégories")}</option>
            {categories.map((cat, index) => (
              <option key={`${cat.name_search}-${index}`} value={cat.name_search}>
                {locale === "ar" ? cat.name_ar : cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">
            {t("Prix")}
          </label>
          <div className="space-y-2">
            <div className="flex gap-1 sm:gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(event) =>
                  onFilterChange("priceRange", [
                    Number(event.target.value),
                    maxPrice,
                  ])
                }
                className="w-full p-1.5 sm:p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(event) =>
                  onFilterChange("priceRange", [
                    minPrice,
                    Number(event.target.value),
                  ])
                }
                className="w-full p-1.5 sm:p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 sm:mt-6">
        <button
          onClick={onReset}
          className="px-3 sm:px-6 py-1.5 sm:py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-xs sm:text-sm"
        >
          {t("Réinitialiser")}
        </button>
      </div>
    </div>
  );
};

export default FiltersPanel;
