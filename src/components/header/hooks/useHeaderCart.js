import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useCart } from "contexts/CartContext";
import { getLocalizedTitle } from "lib/product-utils";
import {
  calculateCartSummary,
  optimizeCloudinaryUrl,
} from "../header.utils";

const DEFAULT_ERROR_MESSAGE = "Failed to fetch data";

const buildCartItemViewModel = (item, locale) => {
  const unitPrice = Number(item?.priceData?.unitPrice || 0);
  const quantity = Number(item?.quantite || 0);
  const imageUrl = optimizeCloudinaryUrl(
    item?.caracteristique_couleur?.img ||
      item?.id_product?.array_ProductImg?.[0]?.secure_url
  );

  return {
    id: item?._id || "",
    title: getLocalizedTitle(item?.id_product?.title, locale),
    imageUrl: imageUrl || "/images/gg1.webp",
    quantity,
    unitPrice,
    totalPrice: unitPrice * quantity,
    characteristics: Object.entries(item?.caracteristique || {}).map(
      ([key, value]) => ({ key, value })
    ),
    color: item?.caracteristique_couleur?.type || "",
  };
};

export const useHeaderCart = ({ locale, session, status }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    cartItems: rawCartItems,
    cartCount,
    isCartLoading,
    isCartLoaded,
    fetchCart,
    deleteCartItem,
  } = useCart();

  const openCart = useCallback(async () => {
    if (!isCartLoaded) {
      await fetchCart();
    }
    setIsCartOpen(true);
  }, [fetchCart, isCartLoaded]);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const deleteItem = useCallback(
    async (itemId) => {
      try {
        await deleteCartItem(itemId);
        toast.success("product delete from cart");
      } catch (error) {
        toast.error("Failed to delete productcart");
      }
    },
    [deleteCartItem]
  );

  const cartItems = useMemo(
    () => rawCartItems.map((item) => buildCartItemViewModel(item, locale)),
    [rawCartItems, locale]
  );

  const { subtotal, subtotalBenefit } = useMemo(
    () => calculateCartSummary(rawCartItems),
    [rawCartItems]
  );

  return {
    cartItems,
    cartCount,
    isCartOpen,
    isCartLoading,
    subtotal,
    subtotalBenefit,
    openCart,
    closeCart,
    deleteItem,
  };
};
