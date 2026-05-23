import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { parseProductsResponse } from "app/[locale]/(pages)/(home)/home.schemas";
import { getLocalizedTitle } from "lib/product-utils";
import { optimizeCloudinaryUrl } from "../header.utils";

const DEFAULT_ERROR_MESSAGE = "Failed to fetch data";

const matchesQuery = (product, query) => {
  const normalizedQuery = query.toLowerCase();
  const titleAr = product?.title?.ar || "";
  const titleFr = product?.title?.fr || "";

  return (
    titleAr.toLowerCase().includes(normalizedQuery) ||
    titleFr.toLowerCase().includes(normalizedQuery)
  );
};

const filterProducts = (products, query, selectedCategory) => {
  let filtered = products;

  if (selectedCategory) {
    filtered = filtered.filter(
      (product) => product?.categorie === selectedCategory
    );
  }

  return filtered.filter((product) => matchesQuery(product, query));
};

const buildSearchResult = (product, locale) => {
  const price = Number(product?.price || 0);
  const reductionValue = Number(product?.reduction || 0);
  const oldPrice =
    Number(product?.ancien_price || 0) > 0
      ? Number(product?.ancien_price || 0)
      : reductionValue > 0
        ? price + reductionValue
        : 0;

  const resolveId = (p) => {
    const val = p?._id ?? p?.id ?? "";
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val.toString === "function") return val.toString();
    return String(val);
  };

  const idStr = resolveId(product);

  return {
    id: idStr,
    href: `/product_detail/${idStr}`,
    title: getLocalizedTitle(product?.title, locale) || "Produit",
    imageUrl:
      optimizeCloudinaryUrl(product?.array_ProductImg?.[0]?.secure_url) ||
      "/images/gg1.webp",
    price,
    oldPrice,
    hasPromotion: oldPrice > price,
  };
};

export const useHeaderSearch = ({ locale }) => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MY_URL}/api/get_Products`,
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }

      const payload = await res.json();
      const parsed = parseProductsResponse(payload);

      if (!parsed.success) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }

      setProducts(parsed.data);
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const submitSearch = useCallback(() => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const filtered = filterProducts(
      products,
      trimmedQuery,
      selectedCategory
    );

    setSearchResults(filtered);
    setIsSearchOpen(true);
  }, [products, searchQuery, selectedCategory]);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  const results = useMemo(
    () => searchResults.map((product) => buildSearchResult(product, locale)),
    [searchResults, locale]
  );

  return {
    isSearchOpen,
    searchQuery,
    selectedCategory,
    results,
    setSearchQuery,
    setSelectedCategory,
    openSearch,
    closeSearch,
    submitSearch,
  };
};
