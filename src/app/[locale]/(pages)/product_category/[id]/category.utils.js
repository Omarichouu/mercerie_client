import { getOptimizedCloudinaryUrl } from "lib/product-utils";

export const getCategoryDisplayData = (categories, categoryId) => {
  if (!categories?.length) {
    return {
      currentCategory: null,
      otherCategories: [],
      subcategories: [],
      showSubcategories: false,
    };
  }

  const currentCategory =
    categories.find((item) => item.name_search === categoryId) ||
    categories[0];
  const otherCategories = categories.filter(
    (item) => item.name_search !== currentCategory?.name_search
  );
  const subcategories = currentCategory?.subcategories || [];

  return {
    currentCategory,
    otherCategories,
    subcategories,
    showSubcategories: subcategories.length > 0,
  };
};

export const getCategoryImageUrl = (url, size) =>
  getOptimizedCloudinaryUrl(url, {
    width: size,
    crop: "fill",
    quality: "auto:good",
    dpr: "auto",
  });

export const getCategoryHeroUrl = (url) =>
  getOptimizedCloudinaryUrl(url, {
    width: 1200,
    crop: "fill",
    quality: "auto:good",
  });
