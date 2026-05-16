"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

const fallbackImg = "/images/gg1.webp";

const ProductGallery = ({ images = [], productTitle = "" }) => {
  const t = useTranslations("ProductDetail");
  const safeImages = useMemo(
    () => (images.length ? images : [{ secure_url: fallbackImg }]),
    [images]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  }, [safeImages.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  }, [safeImages.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!isZoomed) return;
      if (e.key === "Escape") setIsZoomed(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev, isZoomed]);

  const currentImage = safeImages[currentIndex]?.secure_url || fallbackImg;

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-4 lg:sticky lg:top-6 lg:h-fit w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden  sm:rounded-2xl bg-white dark:bg-gray-800 shadow-md w-full"
        >
          <div className="aspect-square w-full relative bg-gray-50 dark:bg-gray-900">
            <Image
              src={currentImage}
              alt={`${productTitle} - ${currentIndex + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              className="object-cover cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
              priority={currentIndex === 0}
            />

            {safeImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 text-gray-900 dark:text-white rounded-full p-1.5 sm:p-2 shadow hover:scale-105 transition"
                  aria-label={t("prevImage")}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute  right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 text-gray-900 dark:text-white rounded-full p-1.5 sm:p-2 shadow hover:scale-105 transition"
                  aria-label={t("nextImage")}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-gray-900/80 text-white text-xs px-2 sm:px-3 py-1 rounded-full">
                  {currentIndex + 1} / {safeImages.length}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {safeImages.length > 1 && (
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 px-0.5">
            {safeImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 rounded-lg border-2 transition ${
                  idx === currentIndex
                    ? "border-[#D4B814] shadow-md"
                    : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="h-16 w-16 sm:h-20 sm:w-20 relative overflow-hidden rounded-md bg-gray-50 dark:bg-gray-900">
                  <Image
                    src={img.secure_url || fallbackImg}
                    alt={t("thumbnailAlt", { index: idx + 1 })}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 bg-white/10 text-white p-3 rounded-full hover:bg-white/20"
              aria-label={t("close")}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-[90vw] max-h-[90vh]"
            >
              <Image
                src={currentImage}
                alt={t("zoomAlt")}
                width={1200}
                height={1200}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductGallery;
