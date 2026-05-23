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
            className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide pb-3 px-6 sm:px-0 items-center snap-x snap-mandatory"
          >
            {items.map((item) => {
              const itemTitle = locale === "ar" ? item.name_ar : item.name;
              const thumbnail =
                getCategoryImageUrl(item.img_url, 200) ||
                "/images/no-available.png";
              const isSelected =
                isSubCategoryList && selectedSubCategory === item.name_search;

              const card = (
                <div
                  className={`relative w-28 sm:w-36 lg:w-44 rounded-2xl overflow-hidden border transition-all duration-500 ${
                    isSelected
                      ? "border-amber-300/80 ring-2 ring-amber-400/60 shadow-lg"
                      : "border-gray-200/80 dark:border-gray-700/60 shadow-sm hover:shadow-xl"
                  } bg-white dark:bg-gray-800 `}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                    <Image
                      src={thumbnail}
                      alt={itemTitle}
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-gray-900/80 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-semibold text-gray-900 dark:text-gray-100 shadow-md">
                        {itemTitle}
                      </div>
                    </div>
                  </div>
                </div>
              );

              if (isSubCategoryList) {
                return (
                  <button
                    key={item.name_search}
                    onClick={() => onSubCategorySelect(item.name_search)}
                    className="flex-shrink-0 group cursor-pointer my-0.5 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                    aria-pressed={isSelected}
                    type="button"
                  >
                    {card}
                  </button>
                );
              }

              return (
                <Link
                  href={`/product_category/${item.name_search}`}
                  key={item.name_search}
                  className="flex-shrink-0 group cursor-pointer my-0.5 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                >
                  {card}
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
