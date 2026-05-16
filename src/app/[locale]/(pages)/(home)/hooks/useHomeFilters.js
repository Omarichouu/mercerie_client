import { useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_FILTERS, PRICE_RANGE_FALLBACK } from "../home.constants";
import { getLocalizedTitle } from "lib/product-utils";

const clonePriceRange = (range) => [range[0], range[1]];

const getPriceBounds = (products) => {
  if (!products.length) return clonePriceRange(PRICE_RANGE_FALLBACK);
  const prices = products
    .map((item) => item.price)
    .filter((price) => Number.isFinite(price));
  if (!prices.length) return clonePriceRange(PRICE_RANGE_FALLBACK);
  return [Math.min(...prices), Math.max(...prices)];
};

const sortByName = (locale) => (a, b) => {
  const nameA = getLocalizedTitle(a.title, locale);
  const nameB = getLocalizedTitle(b.title, locale);
  return nameA.localeCompare(nameB);
};

export const useHomeFilters = ({ products = [], locale }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const priceBounds = useMemo(() => getPriceBounds(products), [products]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: clonePriceRange(priceBounds),
    }));
  }, [priceBounds]);

  const updateFilter = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      priceRange: clonePriceRange(priceBounds),
    });
  }, [priceBounds]);

  const toggleFilters = useCallback(
    () => setShowFilters((prev) => !prev),
    []
  );

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter((item) => item.categorie === filters.category);
    }

    if (filters.searchTerm) {
      const searchValue = filters.searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        getLocalizedTitle(item.title, locale)
          .toLowerCase()
          .includes(searchValue)
      );
    }

    const [minPrice, maxPrice] = filters.priceRange;
    filtered = filtered.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    const sorted = [...filtered];

    switch (filters.sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort(sortByName(locale));
        break;
      default:
        break;
    }

    return sorted;
  }, [filters, locale, products]);

  return {
    filters,
    filteredProducts,
    showFilters,
    toggleFilters,
    updateFilter,
    resetFilters,
    viewMode,
    setViewMode,
  };
};
