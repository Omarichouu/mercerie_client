import ManageSearchTwoToneIcon from "@mui/icons-material/ManageSearchTwoTone";

import { generateShortId } from "../historique.utils";

const HistoryItem = ({ order, locale, t, onViewDetails }) => (
  <div className="relative w-full flex gap-[3rem] md:gap-[6rem]">
    <div className="flex flex-col items-center">
      <p className="text-[13px] md:text-[16px] w-fit dark:text-white">
        {new Date(order.createdAt).toLocaleDateString()}
      </p>
      <ManageSearchTwoToneIcon
        className="flex-grow dark:text-white"
        style={{ width: "60px" }}
      />
    </div>
    <div className="border-b flex-grow py-[3rem] relative flex flex-col gap-2 dark:border-gray-700">
      <p className="text-[14px] md:text-[16px] font-semibold text-or_color dark:text-or_color2">
        #{generateShortId(order._id)}
      </p>
      {order.array_product.map((product, idx) => (
        <p key={idx} className="text-[14px] md:text-[16px] dark:text-white">
          {product.id_product?.title?.[locale] || t("productNotAvailable")}
        </p>
      ))}

      <button
        type="button"
        title={t("viewProductDetails")}
        onClick={() => onViewDetails(order._id)}
        className="absolute bottom-2 right-5 hover:cursor-pointer text-[#3e3e3e] font-semibold dark:text-white"
      >
        {t("viewDetails")}
      </button>
    </div>
  </div>
);

export default HistoryItem;
