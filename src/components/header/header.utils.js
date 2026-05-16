import { calculateTotalPricev2 } from "assets/les_fontion";
import { getOrCreateUniqueId } from "lib/cart-utils";

export { getOrCreateUniqueId };

export const optimizeCloudinaryUrl = (url) => {
  if (!url) return "";
  return url.replace("/upload/", "/upload/q_auto:good,f_webp/");
};

export const calculateCartSummary = (cartItems = []) => {
  if (!cartItems.length) {
    return { subtotal: 0, subtotalBenefit: 0 };
  }

  const groupedCart = cartItems.reduce((acc, item) => {
    const productId = item?.id_product?._id || "unknown";
    const unitPrice = item?.priceData?.unitPrice || 0;
    const quantity = item?.quantite || 0;
    const lineTotal = unitPrice * quantity;

    if (!acc[productId]) {
      acc[productId] = {
        product: item?.id_product,
        totalQuantity: quantity,
        totalPrice: lineTotal,
      };
    } else {
      acc[productId].totalQuantity += quantity;
      acc[productId].totalPrice += lineTotal;
    }

    return acc;
  }, {});

  const subtotal = Object.values(groupedCart).reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const subtotalBenefit = Object.values(groupedCart).reduce((sum, item) => {
    return (
      sum +
      calculateTotalPricev2(
        item?.product?.reduction,
        item.totalQuantity,
        item.totalPrice
      )
    );
  }, 0);

  return { subtotal, subtotalBenefit };
};
