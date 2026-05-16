"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

const VariantSelector = ({
  product,
  selectedVariants,
  selectedColorImage,
  onVariantSelect,
  onColorSelect,
  isOptionAvailable = (type, value) => true,
  locale = "fr",
}) => {
  const t = useTranslations("ProductDetail");
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    console.group('🎨 VariantSelector Debug');
    console.groupEnd();
  }, [product, selectedColorImage, selectedVariants]);

  return (
    <div className="space-y-8 border-t border-gray-200 pt-6 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("model")}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("variantHelp")}</p>
        </div>
        {selectedColorImage?.type && (
          <span className="rounded-full bg-[#D4B814]/10 px-3 py-1 text-sm font-medium text-[#B08E00] dark:text-[#F1D65C]">
            {t("selected")}: {selectedColorImage.type}
          </span>
        )}
      </div>

      {/* COLORS SECTION */}
      {product.variant_color?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t("color")}</h3>
            {selectedColorImage?.type && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-full bg-[#D4B814]/10 px-3 py-1 text-sm font-medium text-[#B08E00] dark:text-[#F1D65C]"
              >
                {t("selected")} ✓
              </motion.span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {product.variant_color.map((item, idx) => {
              const isActive = selectedColorImage?.type === item.type;
              const isSelectable = 
                item.isActive !== false && 
                isOptionAvailable("couleur", item.type);
              return (
                <motion.div
                  key={item.type + idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => {
                    if (!isSelectable) return;
                    const action = isActive ? '🔴 Toggle OFF' : '🟢 Toggle ON';
                    onColorSelect(item);
                    setZoomedImage(item.img?.secure_url || "/images/gg1.webp");
                  }}
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? "border-[#D4B814] ring-2 ring-[#D4B814]/30"
                      : isSelectable
                      ? "border-gray-200 hover:border-[#D4B814]/60 dark:border-gray-700"
                      : "border-gray-200 bg-gray-100 opacity-55 dark:border-gray-700 dark:bg-gray-900"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Image
                      src={item.img?.secure_url || "/images/gg1.webp"}
                      alt={item.type}
                      fill
                      sizes="(max-width: 768px) 33vw, 120px"
                      className={`object-cover transition-all duration-300 ${
                        !isSelectable ? "blur-[2px] grayscale" : isActive ? "brightness-110" : ""
                      }`}
                    />

                    <div className={`absolute inset-0 transition-colors ${
                      isActive
                        ? "bg-[#D4B814]/25"
                        : isSelectable
                        ? "bg-black/0"
                        : "bg-black/45"
                    }`} />

                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#D4B814] text-white shadow-lg"
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3">
                      <p className={`text-sm font-bold ${isActive ? "text-[#F1D65C]" : "text-white"}`}>
                        {item.type}
                      </p>
                      {item.priceAdjustment > 0 && (
                        <p className="mt-0.5 text-xs text-white/90">+{item.priceAdjustment} DA</p>
                      )}
                      {!isSelectable && (
                        <p className="mt-0.5 text-[10px] font-bold text-red-300">{t("inactive")}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* VARIANTS SECTION */}
      {product.variant?.length > 0 && (
        <div className="space-y-4">
          {product.variant.map((variant, vIdx) => {
            const variantKey = variant.type.fr;
            const selectedValue = selectedVariants?.[variantKey]?.value;
            const variantActive = variant.isActive !== false;

            return (
              <div key={variantKey + vIdx} className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                      {t("optionNumber", { number: vIdx + 1 })}
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                      {variant.type?.[locale] || variant.type.fr}
                      {!variantActive && (
                        <span className="ml-2 text-xs font-bold text-red-500">
                          ❌ Inactif
                        </span>
                      )}
                    </p>
                  </div>
                  {selectedValue ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-full border border-[#D4B814]/20 bg-[#D4B814]/10 px-3 py-1 text-xs font-semibold text-[#B08E00] dark:text-[#F1D65C]"
                    >
                      {t("selected")} ✓
                    </motion.span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                      {t("choose")}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {variant.array_value.map((valueObj, idx) => {
                    const value =
                      typeof valueObj === "object" ? valueObj.value : valueObj;
                    const priceAdjustment =
                      typeof valueObj === "object"
                        ? valueObj.priceAdjustment || 0
                        : 0;
                    const isSelected = selectedValue === value;
                    const isSelectable =
                      variantActive &&
                      (typeof valueObj !== "object" || valueObj.isActive !== false) &&
                      isOptionAvailable(variantKey, value);
                    return (
                      <motion.button
                        key={`${variantKey}-${value}-${idx}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        onClick={() => {
                          if (!isSelectable) return;
                          const action = isSelected ? '🔴 Toggle OFF' : '🟢 Toggle ON';
                          onVariantSelect(variantKey, value, priceAdjustment);
                        }}
                        whileHover={isSelectable ? { y: -1 } : {}}
                        whileTap={isSelectable ? { scale: 0.98 } : {}}
                        disabled={!isSelectable}
                        className={`relative overflow-hidden rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition-all duration-200 ${
                          isSelected && isSelectable
                            ? "border-[#D4B814] bg-[#D4B814] text-gray-950 shadow-md"
                            : isSelectable
                            ? "border-gray-200 bg-white text-gray-900 shadow-sm hover:border-[#D4B814]/50 hover:bg-[#D4B814]/5 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            : "border-gray-200 bg-gray-100 text-gray-400 opacity-60 dark:border-gray-700 dark:bg-gray-900"
                        }`}
                      >
                        <span>{value}</span>
                        {priceAdjustment !== 0 && (
                          <span className={`ml-2 text-[11px] font-semibold ${
                            isSelected ? "text-gray-950/80" : "text-gray-500 dark:text-gray-400"
                          }`}>
                            {priceAdjustment > 0 ? "+" : ""}{priceAdjustment} DA
                          </span>
                        )}
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 font-bold"
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 z-10 transition-colors"
              aria-label={t("close")}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-[90vw] max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={zoomedImage}
                alt={t("zoomAlt")}
                width={1200}
                height={1200}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VariantSelector;
