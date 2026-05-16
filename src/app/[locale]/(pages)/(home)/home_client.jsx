"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

import { category as categories } from "assets/les_variable";
import { buildProductCardModel } from "lib/product-utils";
import { HOME_SLIDES, POPULAR_CATEGORIES_ID } from "./home.constants";
import { useHeroSlider } from "./hooks/useHeroSlider";
import { useHomeFilters } from "./hooks/useHomeFilters";
import { useScrollToId } from "./hooks/useScrollToId";
import CategoryScroller from "./components/CategoryScroller";
import FiltersPanel from "./components/FiltersPanel";
import HeroSlider from "./components/HeroSlider";
import ProductsEmptyState from "./components/ProductsEmptyState";
import ProductsGrid from "./components/ProductsGrid";
import ProductsHeader from "./components/ProductsHeader";
import ProductsPagination from "./components/ProductsPagination";
import ScrollToCategoriesButton from "./components/ScrollToCategoriesButton";

const HomeClient = ({ initialData = [] }) => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const scrollToId = useScrollToId();
  const { currentSlide, setCurrentSlide } = useHeroSlider(HOME_SLIDES.length);
  const {
    filters,
    filteredProducts,
    showFilters,
    toggleFilters,
    updateFilter,
    resetFilters,
    viewMode,
    setViewMode,
  } = useHomeFilters({ products: initialData, locale });

  const productCards = useMemo(
    () =>
      filteredProducts.map((product) =>
        buildProductCardModel({
          product,
          locale,
          viewMode,
          viewDetailsLabel: t("viewDetails"),
          outOfStockLabel: t("ruptureStock") || "Rupture de stock",
          fallbackImage: "/images/gg1.webp",
        })
      ),
    [filteredProducts, locale, t, viewMode]
  );

  return (
    <div className="border py-4 sm:py-8 px-3 sm:px-6 md:rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSlider
        slides={HOME_SLIDES}
        locale={locale}
        currentSlide={currentSlide}
        onSelectSlide={setCurrentSlide}
      />

      <CategoryScroller
        categories={categories}
        locale={locale}
        title={t("popularCategories")}
        targetId={POPULAR_CATEGORIES_ID}
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <ProductsHeader
          t={t}
          filters={filters}
          onFilterChange={updateFilter}
          showFilters={showFilters}
          onToggleFilters={toggleFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          productsCount={filteredProducts.length}
        />

        {showFilters ? (
          <FiltersPanel
            t={t}
            filters={filters}
            categories={categories}
            locale={locale}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
        ) : null}

        {productCards.length ? (
          <ProductsGrid cards={productCards} viewMode={viewMode} />
        ) : (
          <ProductsEmptyState t={t} onReset={resetFilters} />
        )}

        {filteredProducts.length > 15 ? <ProductsPagination t={t} /> : null}

        <ScrollToCategoriesButton
          t={t}
          onClick={() => scrollToId(POPULAR_CATEGORIES_ID)}
        />
      </div>

    </div>
  );
};

export default HomeClient;
