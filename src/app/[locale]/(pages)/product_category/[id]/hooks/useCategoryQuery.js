import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_SORT } from "../category.constants";

const buildQueryString = (searchParams, updates) => {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) {
      params.delete(key);
      return;
    }

    params.set(key, value);
  });

  return params.toString();
};

export const useCategoryQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedSubCategory(searchParams.get("sub") || "");
    setSortBy(searchParams.get("sortBy") || DEFAULT_SORT);
  }, [searchParams]);

  const pushWithUpdates = useCallback(
    (updates) => {
      const query = buildQueryString(searchParams, updates);
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      router.push(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const applySearch = useCallback(() => {
    pushWithUpdates({
      search: searchTerm,
      sub: selectedSubCategory,
      page: "1",
    });
  }, [pushWithUpdates, searchTerm, selectedSubCategory]);

  const changeSubCategory = useCallback(
    (value) => {
      setSelectedSubCategory(value);
      pushWithUpdates({ sub: value, page: "1" });
    },
    [pushWithUpdates]
  );

  const changeSort = useCallback(
    (value) => {
      setSortBy(value);
      pushWithUpdates({ sortBy: value, page: "1" });
    },
    [pushWithUpdates]
  );

  const changePage = useCallback(
    (page) => {
      pushWithUpdates({ page: String(page) });
    },
    [pushWithUpdates]
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedSubCategory,
    changeSubCategory,
    sortBy,
    changeSort,
    applySearch,
    changePage,
  };
};
