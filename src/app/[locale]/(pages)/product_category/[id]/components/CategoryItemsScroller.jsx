import Image from "next/image";
import { Link } from "i18n/navigation";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

import { useHorizontalScroll } from "hooks/useHorizontalScroll";
import { getCategoryImageUrl } from "../category.utils";

const CategoryItemsScroller = ({
  items = [],
  locale,
  heading,
  isSubCategoryList,
  selectedSubCategory,
  onSubCategorySelect,
}) => {
  const { containerRef, scrollByDirection } = useHorizontalScroll({
    isRTL: locale === "ar",
    scrollAmount: 200,
  });

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Filter className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            {heading}
          </h2>

          <div className="hidden sm:flex gap-2" dir="ltr">
            <button
              onClick={() => scrollByDirection("left")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-500 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByDirection("right")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-500 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollByDirection("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 transition-all border border-gray-200 dark:border-gray-600 -ml-2 sm:hidden hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={() => scrollByDirection("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 transition-all border border-gray-200 dark:border-gray-600 -mr-2 sm:hidden hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>

          <div
            ref={containerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 px-6 sm:px-0 items-center"
          >
            {items.map((item) => {
              const itemTitle = locale === "ar" ? item.name_ar : item.name;
              const thumbnail =
                getCategoryImageUrl(item.img_url, 56) ||
                "/images/no-available.png";

              if (isSubCategoryList) {
                const isSelected = selectedSubCategory === item.name_search;

                return (
                  <button
                    key={item.name_search}
                    onClick={() => onSubCategorySelect(item.name_search)}
                    className={`flex-shrink-0 group cursor-pointer my-0.5 p-3 sm:p-4 rounded-xl min-w-[100px] sm:min-w-[120px] transition-all duration-300 border ${
                      isSelected
                        ? "border-amber-300 bg-amber-50/50 dark:bg-amber-900/10"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-white dark:bg-gray-700 shadow-[0_0_0_2px_rgba(212,184,20,0.25)]">
                        <Image
                          src={thumbnail}
                          alt={itemTitle}
                          className="w-full h-full object-cover rounded-xl"
                          width={56}
                          height={56}
                          loading="lazy"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-tight">
                          {itemTitle}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              }

              return (
                <Link
                  href={`/product_category/${item.name_search}`}
                  key={item.name_search}
                  className="flex-shrink-0 group cursor-pointer my-0.5"
                >
                  <div className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-700 min-w-[100px] sm:min-w-[120px] hover:shadow-md hover:-translate-y-0.5 hover:border-amber-300 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-900/10">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 bg-white dark:bg-gray-700 shadow-[0_0_0_2px_rgba(212,184,20,0.25)] group-hover:shadow-[0_0_0_2px_rgba(237,214,88,1)]">
                        <Image
                          src={thumbnail}
                          alt={itemTitle}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
                          fill
                          sizes="(max-width: 640px) 56px, 56px"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-white dark:ring-gray-800 bg-amber-400" />
                    </div>

                    <div className="text-center">
                      <h3 className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300 leading-tight group-hover:text-amber-500 dark:group-hover:text-amber-400">
                        {itemTitle}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItemsScroller;
