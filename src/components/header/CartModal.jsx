import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";
import { ShoppingBag } from "lucide-react";

import Loading from "app/[locale]/loading";
import { Link } from "i18n/navigation";

const getCharacteristicLabel = (key, t) => {
  if (key === "longeur") return t("length");
  if (key === "diametre") return t("diameter");
  if (key === "couleur") return t("color");
  return key;
};

const CartModal = ({
  isOpen,
  isLoading,
  t,
  locale,
  cartItems,
  subtotal,
  subtotalBenefit,
  onClose,
  onDeleteItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal" role="dialog">
      {isLoading ? (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-sm">
          <Loading />
        </div>
      ) : (
        <div className="modal-box h-fit min-h-[400px] max-h-[90vh] min-w-[70vw] max-w-[95vw] lg:max-w-[80vw] bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-0 sm:p-2 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-or_color" />
              {t("cart")}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <ClearIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 p-0 sm:p-3 max-h-[calc(90vh-200px)] overflow-y-auto">
            <div className="flex-1/4">
              <div className="sticky top-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-3 border border-gray-200 dark:border-gray-600 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 bg-or_color rounded-full"></span>
                  {t("prices")}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-300">
                      {t("subtotal")}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {subtotal.toFixed(2)} DA
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-300">
                      {t("discount")}
                    </span>
                    <span className="font-semibold text-red-500">
                      {subtotalBenefit.toFixed(2)} DA
                    </span>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Link
                      className="block w-full text-center py-3 bg-gradient-to-r from-or_color to-or_color2 text-black font-medium rounded-xl hover:from-or_color2 hover:to-or_color transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      href="/"
                      onClick={onClose}
                    >
                      {t("continueShopping")}
                    </Link>

                    <Link
                      className="block w-full text-center py-3 border-2 border-or_color text-or_color hover:bg-or_color hover:text-black font-medium rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      href="/cart"
                      onClick={onClose}
                    >
                      {t("proceedToCheckout")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1/2">
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-3 border border-gray-200 dark:border-gray-600 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 bg-or_color2 rounded-full"></span>
                  {t("cart")} ({cartItems.length})
                </h3>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      {t("emptyCart")}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500">
                      {t("Ajoutezproduits")}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 py-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-or_color/30"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                            <Image
                              src={item.imageUrl}
                              width={80}
                              height={80}
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              alt={item.title || t("cart")}
                              loading="lazy"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-or_color transition-colors duration-200 truncate">
                              {item.title}
                            </h4>

                            <div className="flex items-center justify-between mt-2">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                <span>
                                  <span className="hidden md:inline">
                                    {t("quantity")}:
                                  </span>{" "}
                                  {item.quantity} x{" "}
                                </span>
                                <span className="font-semibold text-or_color">
                                  {item.unitPrice} DZD
                                </span>
                              </div>
                              <div className="text-lg font-bold text-gray-800 dark:text-gray-200 hidden sm:block">
                                {item.totalPrice.toFixed(2)} DZD
                              </div>
                            </div>

                            {item.characteristics.length > 0 ? (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.characteristics.map(({ key, value }) => (
                                  <div
                                    key={key}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs"
                                  >
                                    <span className="font-medium text-gray-600 dark:text-gray-400">
                                      {getCharacteristicLabel(key, t)}:
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      {value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : null}

                            {item.color ? (
                              <div className="mt-2">
                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                                  <span className="font-medium text-gray-600 dark:text-gray-400">
                                    {t("color")}:
                                  </span>
                                  <span className="text-gray-800 dark:text-gray-200">
                                    {item.color}
                                  </span>
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <button
                            onClick={() => onDeleteItem(item.id)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                          >
                            <ClearIcon sx={{ fontSize: "16px" }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {cartItems.length} {cartItems.length === 1 ? t("article") : t("articles")}
                {t("dansvotrepanier")}
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 font-medium"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
