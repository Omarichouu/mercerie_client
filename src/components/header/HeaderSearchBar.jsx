import { Search } from "lucide-react";

const HeaderSearchBar = ({
  t,
  locale,
  categories,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onSearchSubmit,
  onOpenSearch,
}) => (
  <div className="w-full lg:max-w-2xl relative">
    <div className="flex items-center bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden group transition-all duration-300 hover:shadow-or_color/20 hover:shadow-lg">
      <div className="p-4">
        <Search className="w-5 h-5 text-gray-400 group-hover:text-or_color transition-colors duration-200" />
      </div>

      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        className={`flex-1 py-4 px-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 ${
          locale === "ar" ? "text-right pr-4" : "text-left pl-2"
        }`}
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        onClick={onOpenSearch}
      />

      <div className="hidden md:flex items-center">
        <div
          className={`h-8 w-px bg-gray-200 dark:bg-gray-600 ${
            locale === "ar" ? "ml-4" : "mr-4"
          }`}
        ></div>
        <select
          className={`bg-transparent dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none px-4 py-4 min-w-[120px] ${
            locale === "ar" ? "text-right" : "text-left"
          }`}
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <option value="">{t("allCategories")}</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name_search}>
              {locale === "ar" ? cat.name_ar : cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-transparent w-2"></div>

      <button
        onClick={onSearchSubmit}
        className="px-6 py-4 bg-gradient-to-r from-or_color to-or_color2 text-black hover:from-or_color2 hover:to-or_color transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl hidden sm:block"
      >
        <span className="hidden sm:inline">{t("searchButton")}</span>
        <Search className="w-5 h-5 sm:hidden" />
      </button>
    </div>
  </div>
);

export default HeaderSearchBar;
