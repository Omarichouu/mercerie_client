import { calculateTotalPrice } from "assets/les_fontion";

import { normalizeCaracteristique } from "./product.utils";

export const buildSelectionData = ({
  activeVariants = [],
  selectedVariants = {},
  selectedColorImage,
}) => {
  let totalAdjustment = selectedColorImage?.priceAdjustment || 0;
  const caracteristique = activeVariants.reduce((acc, variant) => {
    const selected = selectedVariants[variant.type.fr];
    if (selected?.value) {
      acc[variant.type.fr] = selected.value;
      totalAdjustment += selected.priceAdjustment || 0;
    }
    return acc;
  }, {});

  const colorData = {
    type: selectedColorImage?.type || "",
    img: selectedColorImage?.img?.secure_url || "",
  };

  return { caracteristique, colorData, totalAdjustment };
};

export const findMatchingCartItem = (
  cartItems = [],
  productId,
  caracteristique,
  colorData
) => {
  const caracteristiqueKey = normalizeCaracteristique(caracteristique);
  const colorType = colorData?.type || "";
  const colorImg = colorData?.img || "";

  return cartItems.find((item) => {
    if (item.id_product?._id !== productId) return false;
    const itemKey = normalizeCaracteristique(item.caracteristique);
    if (itemKey !== caracteristiqueKey) return false;
    const itemColorType = item.caracteristique_couleur?.type || "";
    const itemColorImg = item.caracteristique_couleur?.img || "";
    return itemColorType === colorType && itemColorImg === colorImg;
  });
};

export const buildCartItemPayload = ({
  userId,
  product,
  quantity,
  caracteristique,
  colorData,
  totalAdjustment,
}) => {
  const basePrice = product.price;
  const unitPrice = basePrice + totalAdjustment;

  return {
    id_user: userId,
    id_product: product._id,
    quantite: quantity,
    caracteristique,
    caracteristique_couleur: {
      type: colorData.type,
      img: colorData.img,
    },
    priceData: {
      basePrice,
      priceAdjustment: totalAdjustment,
      unitPrice,
      totalPrice: unitPrice * quantity,
    },
  };
};

export const getDiscountedTotal = (reduction, quantity, unitPrice) =>
  calculateTotalPrice(reduction, quantity, unitPrice);

export const buildOrderPayload = ({
  userId,
  product,
  quantity,
  caracteristique,
  colorData,
  formData,
  adjustedPrice,
  deliveryFees,
  total,
}) => ({
  id_user: userId,
  array_product: [
    {
      id_product: product._id,
      quantite: quantity,
      price: adjustedPrice,
      caracteristique,
      caracteristique_couleur: {
        type: colorData.type,
        img: colorData.img,
      },
    },
  ],
  status: "en attente",
  createdAt: new Date(),
  customerDetails: {
    fullName: formData.fullName,
    phoneNumber: formData.phoneNumber,
    wilaya: formData.wilaya,
    deliveryType: formData.deliveryType,
    commune: formData.commune,
    note: formData.note?.trim() || "",
    ...(formData.deliveryType === "homeDelivery" && {
      address: formData.address,
    }),
    ...(formData.deliveryType === "relayPoint" && formData.relayPoint
      ? {
          relayPoint: {
            center_id: Number(formData.relayPoint.center_id),
            name: formData.relayPoint.name,
            address: formData.relayPoint.address,
            commune_id: Number(formData.relayPoint.commune_id),
            commune_name: formData.relayPoint.commune_name,
            wilaya_id: Number(formData.relayPoint.wilaya_id),
            wilaya_name: formData.relayPoint.wilaya_name,
          },
        }
      : {}),
  },
  deliveryFees,
  total,
});
