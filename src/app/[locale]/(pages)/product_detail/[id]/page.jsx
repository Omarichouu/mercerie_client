import ProductDetailClient from "./product_detail_client";
import {
  DEFAULT_MIN_PRICE,
} from "./product.constants";
import {
  parseMinPriceResponse,
  parseProductResponse,
} from "./product.schemas";
import {
  getProductDescription,
  getProductTitle,
} from "./product.utils";

const BASE_URL = process.env.NEXT_PUBLIC_MY_URL || "";
const DEFAULT_REVALIDATE_SECONDS = 3600;

const isLikelyObjectId = (s) => {
  return typeof s === "string" && /^[0-9a-fA-F]{24}$/.test(s);
};

const fetchProduct = async (id) => {
  if (!id || !isLikelyObjectId(id)) {
    console.warn("fetchProduct called with invalid id:", id);
    return null;
  }

  try {
    const url = `${BASE_URL || ''}/api/get_one_product?id=${encodeURIComponent(id)}`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
        tags: [`product:${id}`, `comments:${id}`],
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const payload = await res.json();
    const parsed = parseProductResponse(payload);

    if (!parsed.success) {
      console.error("Invalid product response", parsed.error);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("Failed to load product", error);
    return null;
  }
};

const fetchMinPrice = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/get_min_price`, {
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch minimum price: ${res.status}`);
    }

    const payload = await res.json();
    const parsed = parseMinPriceResponse(payload);

    if (!parsed.success) {
      console.error("Invalid min price response", parsed.error);
      return DEFAULT_MIN_PRICE;
    }

    return parsed.data.price_min;
  } catch (error) {
    console.error("Failed to load minimum price", error);
    return DEFAULT_MIN_PRICE;
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const product = await fetchProduct(id);

  if (!product) {
    return {
      title: "Produit non trouvé",
      description: "Ce produit n'existe pas ou a été supprimé.",
    };
  }

  const title = getProductTitle(product, "fr");
  const description = getProductDescription(product, "fr");
  const heroImage = product.array_ProductImg?.[0]?.secure_url;

  return {
    title: `${title} | VotreBoutique`,
    description,
    icons: {
      icon: heroImage,
    },
    alternates: {
      canonical: `${BASE_URL}/fr/product_detail/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/fr/product_detail/${id}`,
      images: heroImage
        ? [
            {
              url: heroImage,
              width: 800,
              height: 600,
              alt: title,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const product = await fetchProduct(id);
  const priceMin = await fetchMinPrice();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Produit non trouvé
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Ce produit n'existe pas ou a été supprimé.
        </p>
      </div>
    );
  }

  return <ProductDetailClient product={product} priceMin={priceMin} />;
}

export const revalidate = 3600;
