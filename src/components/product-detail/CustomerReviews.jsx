"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const CustomerReviews = ({
  comments = [],
  productTitle = "",
  rating,
  review,
  name,
  email,
  onRatingChange,
  onFieldChange,
  onSubmit,
  isSubmitting,
}) => {
  const t = useTranslations("ProductDetail");
  const locale = useLocale();
  const [expanded, setExpanded] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const averageRating = comments.length
    ? comments.reduce((acc, c) => acc + (c.rating || 0), 0) / comments.length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className=" bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        <div className="flex items-center gap-4 text-left">
          <div className="p-3 bg-[#FFF9E6] dark:bg-[#D4B814]/20 rounded-xl">
            <MessageCircle className="w-6 h-6 text-[#D4B814]" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("customerReviews")}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(averageRating) ? "text-[#D4B814] fill-[#D4B814]" : "text-gray-300 dark:text-gray-600"}`}
                  />
                ))}
              </div>
              <span>
                {averageRating.toFixed(1)} ({t("reviewsCount", { count: comments.length })})
              </span>
            </div>
          </div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-300">
                <p>{t("noReviewsTitle", { product: productTitle })}</p>
                <p className="text-sm mt-1">{t("noReviewsSubtitle")}</p>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {comments.slice(0, visibleCount).map((comment, idx) => (
                  <div
                    key={`${comment.name}-${idx}`}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4B814] to-[#EDD658] text-white flex items-center justify-center font-semibold">
                          {(comment.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{comment.name}</p>
                          {comment.createdAt && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString(locale, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < (comment.rating || 0) ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-gray-600"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-gray-800 dark:text-gray-200 leading-relaxed">
                      {comment.avis || comment.review}
                    </p>
                  </div>
                ))}

                {visibleCount < comments.length && (
                  <button
                    onClick={() => setVisibleCount((v) => Math.min(v + 3, comments.length))}
                    className="w-full py-2 text-amber-600 font-medium hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg"
                  >
                    {t("viewMoreReviews")}
                  </button>
                )}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("leaveReview")}
              </h3>

              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {t("yourRating")} *
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onRatingChange(i + 1)}
                      className={`text-2xl ${i < rating ? "text-amber-500" : "text-gray-300 dark:text-gray-600"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("yourReview")} *
                </label>
                <textarea
                  name="review"
                  value={review}
                  onChange={onFieldChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder={t("shareExperience")}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("name")} *
                  </label>
                  <input
                    name="name"
                    value={name}
                    onChange={onFieldChange}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("email")} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={onFieldChange}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 rounded-xl shadow hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("sending") : t("submitReview")}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomerReviews;
