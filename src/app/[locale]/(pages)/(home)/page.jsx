import HomeClient from "./home_client";
import { getTopProducts } from "lib/top-products";

const fetchTopProducts = async () => {
  try {
    return await getTopProducts();
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