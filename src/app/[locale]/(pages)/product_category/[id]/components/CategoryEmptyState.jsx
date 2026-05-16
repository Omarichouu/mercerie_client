import { Link } from "i18n/navigation";

const CategoryEmptyState = ({ t }) => (
  <div className="text-center py-12">
    <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
      {t("noProductsFound")}
    </h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
      {t("aucun_produit")}
    </p>
    <Link
      href="/"
      className="inline-block px-6 py-2 bg-[#D4AF37] dark:bg-[#FFD700] text-white rounded-lg hover:shadow transition-all"
    >
      {t("continueShopping")}
    </Link>
  </div>
);

export default CategoryEmptyState;
