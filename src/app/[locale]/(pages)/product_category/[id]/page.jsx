import CategoryClient from "./category_client";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT,
} from "./category.constants";
import { parseCategoryResponse } from "./category.schemas";

const BASE_URL = process.env.NEXT_PUBLIC_MY_URL || "";

const EMPTY_RESPONSE = {
  products: [],
  pagination: {
    currentPage: DEFAULT_PAGE,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    totalItems: 0,
  },
};

const getParamValue = (params, key) => {
  const value = params?.[key];
  if (Array.isArray(value)) return value[0];
  return value;
};

const parsePositiveNumber = (value, fallback) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
};

const buildCategoryUrl = ({ id, page, search, sortBy, sub }) => {
  const params = new URLSearchParams({
    id,
    page: String(page),
    limit: String(DEFAULT_PAGE_SIZE),
  });

  if (search) params.set("search", search);
  if (sortBy) params.set("sortBy", sortBy);
  if (sub) params.set("sub", sub);

  return `${BASE_URL}/api/get_product_by_category?${params.toString()}`;
};

const fetchCategoryProducts = async ({ id, page, search, sortBy, sub }) => {
  try {
    const url = buildCategoryUrl({ id, page, search, sortBy, sub });
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch category products: ${res.status}`);
    }

    const payload = await res.json();
    const parsed = parseCategoryResponse(payload);

    if (!parsed.success) {
      console.error("Invalid category response", parsed.error);
      return EMPTY_RESPONSE;
    }

    return parsed.data;
  } catch (error) {
    console.error("Failed to load category products", error);
    return EMPTY_RESPONSE;
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawId = getParamValue(resolvedParams, "id");
  const safeId = typeof rawId === "string" ? rawId : "categorie";
  const categoryLabel = safeId.replace(/-/g, " ");
  const title = `${categoryLabel} | VotreBoutique`;
  const description = `Découvrez nos produits ${categoryLabel}.`;

  return {
    title,
    description,
    icons: {
      icon: "/img_logo/logo-crystal-annaba.webp",
    },
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const rawId = getParamValue(resolvedParams, "id");
  const id = typeof rawId === "string" ? rawId : "";
  const page = parsePositiveNumber(getParamValue(resolvedSearchParams, "page"), DEFAULT_PAGE);
  const search = getParamValue(resolvedSearchParams, "search") || "";
  const sortBy = getParamValue(resolvedSearchParams, "sortBy") || DEFAULT_SORT;
  const sub = getParamValue(resolvedSearchParams, "sub") || "";

  const data = id
    ? await fetchCategoryProducts({ id, page, search, sortBy, sub })
    : EMPTY_RESPONSE;

  return (
    <CategoryClient
      products={data.products}
      pagination={data.pagination}
      categoryId={id}
    />
  );
}

export const revalidate = 3600;
