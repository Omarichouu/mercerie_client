"use client";

import { useCallback, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { category as categories } from "assets/les_variable";
import { buildProductCardModel } from "lib/product-utils";
import {
  DEFAULT_VIEW_MODE,
  SCROLL_TO_TOP_OFFSET,
} from "./category.constants";
import { useCategoryFilters } from "./hooks/useCategoryFilters";
import { useCategoryQuery } from "./hooks/useCategoryQuery";
import {
  getCategoryDisplayData,
  getCategoryHeroUrl,
  getCategoryImageUrl,
} from "./category.utils";
import CategoryEmptyState from "./components/CategoryEmptyState";
import CategoryFiltersPanel from "./components/CategoryFiltersPanel";
import CategoryGrid from "./components/CategoryGrid";
import CategoryHeader from "./components/CategoryHeader";
import CategoryPagination from "./components/CategoryPagination";
import CategoryToolbar from "./components/CategoryToolbar";

const CategoryClient = ({ products = [], pagination, categoryId }) => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);
  const [showFilters, setShowFilters] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    selectedSubCategory,
    changeSubCategory,
    sortBy,
    changeSort,
    applySearch,
    changePage,
  } = useCategoryQuery();

  const { priceRange, setPriceRange, resetPriceRange, filteredProducts } =
    useCategoryFilters(products);

  const {
    currentCategory,
    otherCategories,
    subcategories,
    showSubcategories,
  } = useMemo(
    () => getCategoryDisplayData(categories, categoryId),
    [categoryId]
  );

  const cards = useMemo(
    () =>
      filteredProducts.map((product) =>
        buildProductCardModel({
          product,
          locale,
          viewMode,
          viewDetailsLabel: t("viewDetails"),
          outOfStockLabel: t("ruptureStock") || "Rupture de stock",
          fallbackImage: "/images/no-available.png",
        })
      ),
    [filteredProducts, locale, t, viewMode]
  );

  const heroImage =
    getCategoryHeroUrl(currentCategory?.img_url) || "/images/no-available.png";
  const heroThumbnail =
    getCategoryImageUrl(currentCategory?.img_url, 112) ||
    "/images/no-available.png";
  const heroTitle = currentCategory
    ? locale === "ar"
      ? currentCategory.name_ar
      : currentCategory.name
    : categoryId;

  const scrollerHeading = showSubcategories
    ? t("SousCategorie")
    : t("AutresCatégories");
  const scrollerItems = showSubcategories ? subcategories : otherCategories;

  const handleSubCategoryToggle = useCallback(
    (value) => {
      const nextValue = value === selectedSubCategory ? "" : value;
      changeSubCategory(nextValue);
    },
    [changeSubCategory, selectedSubCategory]
  );

  const handlePageChange = useCallback(
    (page) => {
      changePage(page);
      window.scrollTo({ top: SCROLL_TO_TOP_OFFSET, behavior: "smooth" });
    },
    [changePage]
  );

  return (
    <div className="border border-gray-200 dark:border-gray-700 py-8 px-4 sm:py-12 sm:px-6 md:rounded-xl bg-white dark:bg-gray-800 shadow-sm">
      <CategoryHeader
        hero={{
          backgroundImage: heroImage,
          thumbnailImage: heroThumbnail,
        }}
        heroTitle={heroTitle}
        heroSubtitle={t("Découvreznotresélectionpremium")}
        heroThumbnailAlt={heroTitle}
        scrollerItems={scrollerItems}
        scrollerHeading={scrollerHeading}
        locale={locale}
        isSubCategoryList={showSubcategories}
        selectedSubCategory={selectedSubCategory}
        onSubCategorySelect={handleSubCategoryToggle}
      />

      <CategoryToolbar
        title={heroTitle}
        productCount={filteredProducts.length}
        t={t}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearchSubmit={applySearch}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        sortBy={sortBy}
        onSortChange={changeSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {showFilters ? (
        <CategoryFiltersPanel
          t={t}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          onReset={resetPriceRange}
        />
      ) : null}

      {cards.length ? (
        <CategoryGrid cards={cards} viewMode={viewMode} />
      ) : (
        <CategoryEmptyState t={t} />
      )}

      <CategoryPagination
        pagination={pagination}
        currentPage={pagination?.currentPage || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoryClient;
