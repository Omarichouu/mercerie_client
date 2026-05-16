import Loading from "app/[locale]/loading";

const HistoryModal = ({
  isOpen,
  isLoading,
  order,
  locale,
  t,
  onClose,
  onMarkReceived,
}) => (
  <>
    <input
      type="checkbox"
      id="my_modal_7"
      className="modal-toggle"
      checked={isOpen}
      readOnly
    />
    <div className="modal" role="dialog">
      {isLoading ? (
        <div className="fixed inset-0 flex flex-col justify-center items-center dark:bg-gray-900/80">
          <Loading />
        </div>
      ) : (
        <div className="modal-box h-fit min-h-[360px] flex flex-col gap-3 bg-white dark:bg-gray-800 overflow-y-auto relative">
          <p className="font-bold text-[#3e3e3e] absolute top-3 right-5 dark:text-white">
            {t("status")}: {" "}
            <span
              className={`${
                order?.status === "refusé" ? "text-red-500" : "text-green-500"
              } font-semibold`}
            >
              {order?.status || "N/A"}
            </span>
          </p>
          <div className="flex flex-col gap-3 pt-[2rem]">
            <fieldset className="border rounded-lg p-4 flex flex-col gap-3 dark:border-gray-700">
              <legend className="font-bold text-[#3e3e3e] px-2 dark:text-white">
                {t("products")}
              </legend>
              {order?.array_product.map((product, idx) => (
                <div
                  key={idx}
                  className="text-[14px] md:text-[16px] flex gap-2 items-center justify-between dark:text-white"
                >
                  <p>
                    <span className="font-semibold">{product.quantite} *</span>{" "}
                    {product.id_product?.title?.[locale] ||
                      t("productNotAvailable")}
                  </p>
                  <p className="font-semibold">
                    {product.price || "0.00"} DA
                  </p>
                </div>
              ))}
            </fieldset>

            <fieldset className="border rounded-lg p-4 flex flex-col gap-3 dark:border-gray-700">
              <legend className="font-bold text-[#3e3e3e] px-2 dark:text-white">
                {t("prices")}
              </legend>
              <div className="text-[14px] md:text-[16px] flex gap-2 items-center justify-between dark:text-white">
                <p>{t("subtotal")}</p>
                <p className="font-semibold">
                  {order?.total - order?.deliveryFees || "0.00"} DA
                </p>
              </div>
              <div className="text-[14px] md:text-[16px] flex gap-2 items-center justify-between dark:text-white">
                <p>{t("shipping")}</p>
                <p className="font-semibold">
                  {order?.deliveryFees || "0.00"} DA
                </p>
              </div>
              <div className="text-[14px] md:text-[16px] flex gap-2 items-center justify-between dark:text-white">
                <p className="font-semibold">{t("total")}</p>
                <p className="font-semibold text-red-500">
                  {order?.total || "0.00"} DA
                </p>
              </div>
            </fieldset>

            {order?.customerDetails?.note ? (
              <fieldset className="border rounded-lg p-4 flex flex-col gap-2 dark:border-gray-700">
                <legend className="font-bold text-[#3e3e3e] px-2 dark:text-white">
                  {t("note")}
                </legend>
                <p className="text-[14px] md:text-[16px] whitespace-pre-wrap dark:text-white">
                  {order.customerDetails.note}
                </p>
              </fieldset>
            ) : null}

            {order?.status === "en cours de livraison" ? (
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform transition duration-200 hover:scale-105"
                onClick={() => onMarkReceived(order._id)}
              >
                {t("markAsReceived")}
              </button>
            ) : null}

            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform transition duration-200 hover:scale-105 dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={onClose}
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  </>
);

export default HistoryModal;
