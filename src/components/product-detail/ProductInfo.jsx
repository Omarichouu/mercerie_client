"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Tag, Truck, Package } from "lucide-react";
import { useTranslations } from "next-intl";

const ProductInfo = ({ product, currentPrice, locale = "fr" }) => {
  const t = useTranslations("ProductDetail");
  const discountPercentage = product.ancien_price && product.ancien_price > product.price
    ? Math.round(((product.ancien_price - product.price) / product.ancien_price) * 100)
    : 0;

  const title = product.title?.[locale] || product.title?.fr;
  const description = product.description?.[locale] || product.description?.fr;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h1>
        {product.comments && product.comments.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("reviewsCount", { count: product.comments.length })}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-2"
      >
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl md:text-4xl font-bold text-[#D4B814]">
            {currentPrice.toLocaleString()} DZD
          </span>
          {product.ancien_price  && product.ancien_price > product.price && (
            <>
              <span className="text-lg line-through text-gray-500 dark:text-gray-400">
                {product.ancien_price.toLocaleString()} DZD
              </span>
              <span className="text-sm font-semibold text-red-500 bg-red-50 dark:bg-red-900/40 px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
        {discountPercentage > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {t("youSave", { amount: (product.ancien_price - product.price).toLocaleString() })}
          </p>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-base text-gray-700 dark:text-gray-200 leading-relaxed"
      >
        {description}
      </motion.p>

      {product.reduction && product.reduction.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="border border-[#EDD658] dark:border-[#D4B814] bg-[#FFF9E6] dark:bg-[#D4B814]/20 rounded-2xl p-5 space-y-3"
        >
          <div className="flex items-center gap-2 text-[#D4B814] dark:text-[#EDD658]">
            <Tag className="w-5 h-5" />
            <h3 className="font-semibold">{t("specialOffers")}</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
            {product.reduction.map((reduction, index) => (
              <li key={`${reduction.quantite}-${index}`} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#D4B814]" />
                <span>
                  {t.rich("buyXSave", {
                    qty: reduction.quantite,
                    amount: reduction.reduction.toLocaleString(),
                    strong: (chunks) => (
                      <strong className="text-red-600 dark:text-red-400">{chunks}</strong>
                    ),
                  })}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[{ icon: Truck, label: "Livraison rapide" }, { icon: Shield, label: "Paiement sécurisé" }, { icon: Package, label: "Retours sous 7j" }].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-3 bg-white dark:bg-gray-800"
          >
            <Icon className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-gray-800 dark:text-gray-200">{label}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ProductInfo;
