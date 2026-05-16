import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";
import { Search } from "lucide-react";

import { Link } from "i18n/navigation";

const SearchModal = ({
  isOpen,
  t,
  searchQuery,
  results,
  onSearchChange,
  onSearchSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl mx-2 sm:mx-4 overflow-hidden transition-all duration-300 ease-in-out">
        <div className="p-2 md:p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-2 md:px-4 py-3 gap-2 md:gap-3">
            <Search className="w-5 h-5 text-gray-500 sm:block hidden" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="flex-1 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              autoFocus
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearchSubmit();
                }
              }}
            />

            <div className="flex items-center">
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ClearIcon className="w-5 h-5 text-gray-500" />
              </button>

              {searchQuery ? (
                <button
                  onClick={onSearchSubmit}
                  className="p-2 bg-[#D4B814] hover:bg-[#EDD658] rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="overflow-hidden transition-all duration-500 ease-in-out">
          <div
            className={`flex flex-col divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto ${
              results.length > 0 ? "max-h-[60vh] mb-2" : "max-h-0"
            }`}
          >
            {results.map((product) => (
              <Link
                href={product.href}
                key={product.id}
                className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={onClose}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 flex-shrink-0 h-full">
                    <Image
                      src={product.imageUrl}
                      width={64}
                      height={64}
                      alt={product.title}
                      className="rounded-lg object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {product.hasPromotion ? (
                        <>
                          <span className="text-or_color font-medium">
                            {product.price} DZD
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            {product.oldPrice} DZD
                          </span>
                        </>
                      ) : (
                        <span className="text-or_color font-medium">
                          {product.price} DZD
                        </span>
                      )}
                    </div>
                    {product.hasPromotion ? (
                      <div className="mt-1">
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-200">
                          {t("PROMOTION")}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
