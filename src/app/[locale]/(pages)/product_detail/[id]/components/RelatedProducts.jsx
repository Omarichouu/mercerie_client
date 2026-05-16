"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import ProductCard from "components/product/ProductCard";
import { buildProductCardModel } from "lib/product-utils";
import { useRelatedProducts } from "../hooks/useRelatedProducts";

const RelatedProducts = ({ productId }) => {
  const locale = useLocale();
  const t = useTranslations("relatedProducts");
  const [favorites, setFavorites] = useState(new Set());

  const { relatedProducts, isLoading, currentIndex, nextSlide, prevSlide } =
    useRelatedProducts({ productId, limit: 8 });

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)));
    }
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem("favorites", JSON.stringify([...next]));
      return next;
    });
  };

  const hasCarousel = relatedProducts.length > 4;

  const translatedTitle = useMemo(
    () => t("relatedProducts") || "Produits similaires",
    [t]
  );

  const cards = useMemo(
    () =>
      relatedProducts.map((product) =>
        buildProductCardModel({
          product,
          locale,
          viewMode: "grid",
          variant: "carousel",
          viewDetailsLabel: t("viewDetails"),
          outOfStockLabel: "Rupture de stock",
          fallbackImage: "/images/gg1.webp",
        })
      ),
    [relatedProducts, locale, t]
  );

  if (isLoading) {
    return (
      <div className="mt-12 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#3e3e3e] dark:text-white">
        {translatedTitle}
      </h2>

      <div className="hidden md:block relative">
        {hasCarousel ? (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
              aria-label={t("previousProducts")}
            >
              <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
              aria-label={t("nextProducts")}
            >
              <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
          </>
        ) : null}

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {cards.map((card) => (
              <ProductCard
                key={card.id}
                card={card}
                // isFavorite={favorites.has(card.id)}
                // onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden grid grid-cols-2 gap-3">
        {cards.slice(0, 4).map((card) => (
          <ProductCard
            key={card.id}
            card={card}
            isFavorite={favorites.has(card.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
