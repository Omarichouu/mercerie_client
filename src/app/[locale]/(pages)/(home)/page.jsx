import HomeClient from "./home_client";
import { parseProductsResponse } from "./home.schemas";

const PRODUCTS_URL = `${process.env.NEXT_PUBLIC_MY_URL}/api/get_Products_plus_vendus`;

const fetchTopProducts = async () => {
  try {
    const res = await fetch(PRODUCTS_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const payload = await res.json();
    const parsed = parseProductsResponse(payload);

    if (!parsed.success) {
      console.error("Invalid products response", parsed.error);
      return [];
    }

    return parsed.data;
  } catch (error) {
    console.error("Failed to load top products", error);
    return [];
  }
};

export default async function HomePage() {
  const initialData = await fetchTopProducts();
  return <HomeClient initialData={initialData} />;
}

export const revalidate = 3600;