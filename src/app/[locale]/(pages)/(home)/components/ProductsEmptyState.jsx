import { Search } from "lucide-react";

const ProductsEmptyState = ({ t, onReset }) => (
  <div className="col-span-full text-center py-8 sm:py-12">
    <div className="max-w-md mx-auto px-4">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {t("AucunProduit")}
      </h3>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
        {t("EssayezModifierFiltrage")}
      </p>
      <button
        onClick={onReset}
        className="bg-[#D4AF37] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#C9A227] transition-colors text-sm sm:text-base"
      >
        {t("Réinitialiser")}
      </button>
    </div>
  </div>
);

export default ProductsEmptyState;
