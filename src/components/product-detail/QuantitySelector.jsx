"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

const QuantitySelector = ({ quantity, onChange, min = 1, max = 99 }) => {
  const t = useTranslations("ProductDetail");
  const decrease = () => {
    if (quantity > min) onChange(quantity - 1);
  };
  const increase = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t("quantity")}</span>
      <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
        <button
          onClick={decrease}
          disabled={quantity <= min}
          className="p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={t("decreaseQuantity")}
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const value = Number(e.target.value) || min;
            const clamped = Math.max(min, Math.min(max, value));
            onChange(clamped);
          }}
          className="w-14 text-center py-2 bg-transparent text-gray-900 dark:text-gray-100 font-semibold text-lg focus:outline-none"
          min={min}
          max={max}
        />
        <button
          onClick={increase}
          disabled={quantity >= max}
          className="p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={t("increaseQuantity")}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
