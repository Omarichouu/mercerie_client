const ProductsPagination = ({ t }) => (
  <div className="flex justify-center mt-8 sm:mt-12">
    <div className="flex items-center gap-1 sm:gap-2">
      <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
        {t("Précédent")}
      </button>
      <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#D4AF37] text-white rounded-lg text-xs sm:text-sm">
        1
      </span>
      <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
        2
      </button>
      <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
        3
      </button>
      <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
        {t("Suivant")}
      </button>
    </div>
  </div>
);

export default ProductsPagination;
