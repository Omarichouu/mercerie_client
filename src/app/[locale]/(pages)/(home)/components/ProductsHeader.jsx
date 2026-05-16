import { Grid3X3, List, Search, SlidersHorizontal } from "lucide-react";

const ProductsHeader = ({
  t,
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters,
  viewMode,
  onViewModeChange,
  productsCount,
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
    <div className="flex items-center gap-2 sm:gap-4">
      <h2 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-[#D4AF37] dark:text-[#FFD700]">
        {t("plusvendus")}
      </h2>
      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
        {productsCount} {t("products")}
      </span>
    </div>

    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
      <div className="relative order-2 sm:order-1">
        <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
        <input
          type="text"
          placeholder={t("Rechercher")}
          value={filters.searchTerm}
          onChange={(event) =>
            onFilterChange("searchTerm", event.target.value)
          }
          className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all w-full sm:w-48 lg:w-64 text-sm sm:text-base"
        />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3 order-1 sm:order-2">
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${
            showFilters
              ? "bg-[#D4AF37] text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{t("Filtres")}</span>
        </button>

        <div>
          <select
            value={filters.sortBy}
            onChange={(event) => onFilterChange("sortBy", event.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#D4AF37] text-xs sm:text-sm"
          >
            <option value="name">{t("NomAZ")}</option>
            <option value="price-asc">{t("priceHighToLow")}</option>
            <option value="price-desc">{t("priceLowToHigh")}</option>
          </select>
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-1 sm:p-2 rounded ${
              viewMode === "grid" ? "bg-white dark:bg-gray-600 shadow" : ""
            }`}
          >
            <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-1 sm:p-2 rounded ${
              viewMode === "list" ? "bg-white dark:bg-gray-600 shadow" : ""
            }`}
          >
            <List className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductsHeader;
