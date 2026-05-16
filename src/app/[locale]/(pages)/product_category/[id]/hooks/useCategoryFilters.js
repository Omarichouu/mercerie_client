import { useCallback, useEffect, useMemo, useState } from "react";

import { PRICE_RANGE_FALLBACK } from "../category.constants";

const getPriceBounds = (products) => {
  if (!products?.length) return [...PRICE_RANGE_FALLBACK];

  const prices = products
    .map((item) => item.price)
    .filter((price) => Number.isFinite(price));

  if (!prices.length) return [...PRICE_RANGE_FALLBACK];

  return [Math.min(...prices), Math.max(...prices)];
};

export const useCategoryFilters = (products = []) => {
  const [priceRange, setPriceRange] = useState(PRICE_RANGE_FALLBACK);

  const priceBounds = useMemo(() => getPriceBounds(products), [products]);

  useEffect(() => {
    setPriceRange([priceBounds[0], priceBounds[1]]);
  }, [priceBounds]);

  const resetPriceRange = useCallback(() => {
    setPriceRange([priceBounds[0], priceBounds[1]]);
  }, [priceBounds]);

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = priceRange;

    return products.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
  }, [priceRange, products]);

  return {
    priceRange,
    setPriceRange,
    resetPriceRange,
    filteredProducts,
  };
};
