import Image from "next/image";
import { Link } from "i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useHorizontalScroll } from "hooks/useHorizontalScroll";

const CategoryScroller = ({ categories, locale, title, targetId }) => {
  const { containerRef, scrollByDirection } = useHorizontalScroll({
    isRTL: locale === "ar",
  });

  return (
    <div
      id={targetId}
      className="py-8 sm:py-12 lg:py-16 mb-8 sm:mb-12 lg:mb-16"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-center mb-6 sm:mb-8 lg:mb-12">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent max-w-24 sm:max-w-48 lg:max-w-xs"></div>
          <span className="mx-3 sm:mx-4 lg:mx-6 text-lg sm:text-xl lg:text-2xl font-bold text-[#D4AF37] dark:text-[#FFD700] px-2 sm:px-4">
            {title}
          </span>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent max-w-24 sm:max-w-48 lg:max-w-xs"></div>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollByDirection("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg sm:shadow-xl rounded-full p-2 sm:p-3 lg:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110 -ml-4 sm:-ml-6"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={() => scrollByDirection("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg sm:shadow-xl rounded-full p-2 sm:p-3 lg:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110 -mr-4 sm:-mr-6"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <div
            ref={containerRef}
            className="flex gap-3 sm:gap-4 lg:gap-6 xl:gap-8 overflow-x-auto scrollbar-hide pb-4 sm:pb-6 px-6 sm:px-8 lg:px-12"
          >
            {categories.map((cat, index) => (
              <Link
                key={`${cat.name_search}-${index}`}
                href={`/product_category/${cat.name_search}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-6 xl:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-800 shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 transform border border-gray-100 dark:border-gray-700 min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px] group-hover:border-[#D4AF37]/50">
                  <div className="relative">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ring-2 sm:ring-4 ring-gray-200 dark:ring-gray-600 group-hover:ring-[#D4AF37] group-hover:scale-110">
                      <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900 dark:to-orange-800 flex items-center justify-center">
                        <Image
                          src={cat.img_url}
                          alt={cat.name}
                          fill
                          quality={65}
                          sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 112px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-xs sm:text-sm lg:text-base text-gray-800 dark:text-gray-200 group-hover:text-[#D4AF37] dark:group-hover:text-[#FFD700] transition-colors duration-300 text-center">
                      {locale === "ar" ? cat.name_ar : cat.name}
                    </h3>
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

export default CategoryScroller;
