import { useCallback, useEffect, useState } from "react";

import { fetchRelatedProducts } from "../product.api";
import { parseRelatedProductsResponse } from "../product.schemas";

export const useRelatedProducts = ({ productId, limit = 8 }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!productId) {
      setRelatedProducts([]);
      setIsLoading(false);
      return;
    }

    const loadRelatedProducts = async () => {
      try {
        setIsLoading(true);
        const payload = await fetchRelatedProducts(productId, limit);
        const parsed = parseRelatedProductsResponse(payload);
        if (!parsed.success) {
          console.error("Invalid related products response", parsed.error);
          setRelatedProducts([]);
          return;
        }
        setRelatedProducts(parsed.data || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRelatedProducts();
  }, [limit, productId]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + 1 >= Math.max(relatedProducts.length - 3, 0) ? 0 : prev + 1
    );
  }, [relatedProducts.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(relatedProducts.length - 4, 0) : prev - 1
    );
  }, [relatedProducts.length]);

  return {
    relatedProducts,
    isLoading,
    currentIndex,
    nextSlide,
    prevSlide,
  };
};
