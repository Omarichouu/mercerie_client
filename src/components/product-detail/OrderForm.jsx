"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, Home, Store, Truck, Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildWilayaLabel } from "lib/yalidine";

/**
 * @typedef {Object} OrderFormProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {{ fullName: string, phoneNumber: string, confirmedPhoneNumber: string, wilaya: string, deliveryType: string, commune: string, relayPoint: any, address: string, note: string }} formData
 * @property {(event: any) => void} onInputChange
 * @property {(centerId: string | number) => void} onSelectRelayPoint
 * @property {(quantity: number) => void} onQuantityChange
 * @property {() => void} onSubmit
 * @property {boolean} isLoading
 * @property {number} subtotal
 * @property {number} deliveryFees
 * @property {number} total
 * @property {number} quantity
 * @property {Array<{ id: number, name: string }>} [wilayas]
 * @property {Array<{ id?: number, name: string }>} [communes]
 * @property {Array<{ center_id: number, address: string }>} [centers]
 * @property {boolean} [isLoadingCenters]
 */

/**
 * @param {OrderFormProps} props
 */
function OrderForm(props) {
  const {
    isOpen,
    onClose,
    formData,
    onInputChange,
    onSelectRelayPoint,
    onQuantityChange,
    onSubmit,
    isLoading,
    subtotal,
    deliveryFees,
    total,
    quantity,
    wilayas = [],
    communes = [],
    centers = [],
    isLoadingCenters,
  } = props;
  const t = useTranslations("CartPage");
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FFF9E6] dark:bg-[#D4B814]/20 rounded-xl">
                  <Package className="w-5 h-5 text-[#D4B814]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("orderForm")}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={t("close")}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("fullName")} *</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={onInputChange}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#D4B814] focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("phoneNumber")} *</label>
                    <input
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={onInputChange}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#D4B814] focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("confirmPhoneNumber")} *</label>
                    <input
                      name="confirmedPhoneNumber"
                      type="tel"
                      value={formData.confirmedPhoneNumber}
                      onChange={onInputChange}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#D4B814] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("deliveryType")} *</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => onInputChange({ target: { name: "deliveryType", value: "relayPoint" } })}
                      className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                        formData.deliveryType === "relayPoint"
                          ? "border-[#D4B814] bg-[#FFF9E6] dark:bg-[#D4B814]/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <Store className={`w-6 h-6 ${formData.deliveryType === "relayPoint" ? "text-[#D4B814]" : "text-gray-500"}`} />
                      <span className="text-sm font-semibold">{t("relayPoint")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onInputChange({ target: { name: "deliveryType", value: "homeDelivery" } })}
                      className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                        formData.deliveryType === "homeDelivery"
                          ? "border-[#D4B814] bg-[#FFF9E6] dark:bg-[#D4B814]/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <Home className={`w-6 h-6 ${formData.deliveryType === "homeDelivery" ? "text-[#D4B814]" : "text-gray-500"}`} />
                      <span className="text-sm font-semibold">{t("homeDelivery")}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("wilaya")} *</label>
                  <select
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={onInputChange}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#D4B814] focus:outline-none"
                    required
                  >
                    <option value="">{t("selectWilaya")}</option>
                    {wilayas.map((wilaya) => (
                      <option key={wilaya.id} value={wilaya.name}>
                        {buildWilayaLabel(wilaya)}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.deliveryType === "relayPoint" && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("selectRelayPoint")} *</label>
                    <select
                      name="relayPoint"
                      value={formData.relayPoint?.center_id || ""}
                      onChange={(e) => onSelectRelayPoint(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#D4B814] focus:outline-none"
                      disabled={isLoadingCenters}
                      required
                    >
                      <option value="">{t("chooseRelayPoint")}</option>
                      {isLoadingCenters ? (
                        <option value="">{t("loading")}</option>
                      ) : Array.isArray(centers) && centers.length > 0 ? (
                        centers.map((center) => (
                          <option key={center.center_id} value={center.center_id}>
                            {center.center_id} - {center.address}
                          </option>
                        ))
                      ) : (
                        <option value="">{t("noCentersAvailable")}</option>
                      )}
                    </select>
                  </div>
                )}

                {formData.deliveryType === "homeDelivery" && (
                  <>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("commune")} *</label>
                      <select
                        name="commune"
                        value={formData.commune}
                        onChange={onInputChange}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#D4B814] focus:outline-none"
                        required
                      >
                        <option value="">{t("selectCommune")}</option>
                        {communes.map((commune) => (
                          <option key={commune.name} value={commune.name}>
                            {commune.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("address")} *</label>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={onInputChange}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#D4B814] focus:outline-none"
                        placeholder={t("addressPlaceholder")}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("note")}</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={onInputChange}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#D4B814] focus:outline-none min-h-[96px]"
                    placeholder={t("notePlaceholder")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("quantity")}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                      className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label={t("decrease")}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onQuantityChange(quantity + 1)}
                      className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label={t("increase")}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-600" /> {t("orderSummary")}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>{t("subtotal")} ({t("itemsCount", { count: quantity })})</span>
                      <span className="font-semibold">{subtotal.toLocaleString()} DZD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("deliveryFees")}</span>
                      <span className="font-semibold">{deliveryFees ? `${deliveryFees.toLocaleString()} DZD` : "—"}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-base font-bold text-gray-900 dark:text-white">
                      <span>{t("total")}</span>
                      <span className="text-amber-600">{total.toLocaleString()} DZD</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onSubmit}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 rounded-xl shadow hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? t("processing") : t("placeOrder")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OrderForm;
