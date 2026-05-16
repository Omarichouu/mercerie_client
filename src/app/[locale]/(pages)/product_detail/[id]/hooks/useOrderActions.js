import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { useCart } from "contexts/CartContext";
import { getOrCreateUniqueId } from "lib/cart-utils";
import {
  addProductToCart,
  createOrder,
  updateCartQuantity,
  updatePurchaseCount,
} from "../product.api";
import {
  buildCartItemPayload,
  buildOrderPayload,
  buildSelectionData,
  findMatchingCartItem,
  getDiscountedTotal,
} from "../product.order-utils";

export const useOrderActions = ({
  product,
  activeVariants,
  selectedVariants,
  selectedColorImage,
  quantity,
  deliveryFees,
  priceMin,
  isProductAvailable,
  missingVariants,
  formData,
  status,
  session,
  incrementCartCount,
  onOrderSuccess,
  t,
  tOrder,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCart } = useCart();

  const resolveUserId = useCallback(
    () =>
      status === "authenticated"
        ? session?.user?._id
        : getOrCreateUniqueId(),
    [session?.user?._id, status]
  );

  const validatePurchase = useCallback(() => {
    if (!isProductAvailable) {
      toast.error(t("productNotAvailable"));
      return false;
    }

    if (missingVariants.length > 0) {
      toast.error(t("selectVariant", { variant: missingVariants.join(", ") }));
      return false;
    }

    return true;
  }, [isProductAvailable, missingVariants, t]);

  const handleAddToCart = useCallback(async () => {
    if (!validatePurchase()) return;

    setIsLoading(true);
    try {
      const userId = resolveUserId();
      const selection = buildSelectionData({
        activeVariants,
        selectedVariants,
        selectedColorImage,
      });

      // Fetch latest cart items from context
      const cartItems = await fetchCart(userId);
      const matchingItem = findMatchingCartItem(
        cartItems,
        product._id,
        selection.caracteristique,
        selection.colorData
      );

      const cartItemPayload = buildCartItemPayload({
        userId,
        product,
        quantity,
        caracteristique: selection.caracteristique,
        colorData: selection.colorData,
        totalAdjustment: selection.totalAdjustment,
      });

      if (matchingItem) {
        await updateCartQuantity({
          _id: matchingItem._id,
          quantite: matchingItem.quantite + quantity,
        });
      } else {
        await addProductToCart(cartItemPayload);
        incrementCartCount(1);
      }

      await fetchCart(userId);
      toast.success(t("productAddedToCart"));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(t("failedToAddProduct"));
    } finally {
      setIsLoading(false);
    }
  }, [
    activeVariants,
    incrementCartCount,
    product,
    quantity,
    resolveUserId,
    selectedColorImage,
    selectedVariants,
    t,
    validatePurchase,
    fetchCart,
  ]);

  const handleSendOrder = useCallback(async () => {
    if (!validatePurchase()) return;

    setIsLoading(true);

    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.confirmedPhoneNumber ||
      !formData.wilaya ||
      !formData.deliveryType
    ) {
      toast.error(tOrder("fillRequiredFields"));
      setIsLoading(false);
      return;
    }

    if (formData.phoneNumber !== formData.confirmedPhoneNumber) {
      toast.error(tOrder("phoneNumbersDoNotMatch"));
      setIsLoading(false);
      return;
    }

    if (formData.deliveryType === "relayPoint" && !formData.relayPoint) {
      toast.error(tOrder("selectRelayPoint"));
      setIsLoading(false);
      return;
    }

    if (
      formData.deliveryType === "homeDelivery" &&
      (!formData.commune || !formData.address)
    ) {
      toast.error(tOrder("fillAddressFields"));
      setIsLoading(false);
      return;
    }

    try {
      const userId = resolveUserId();
      const selection = buildSelectionData({
        activeVariants,
        selectedVariants,
        selectedColorImage,
      });

      const adjustedPrice = product.price + selection.totalAdjustment;
      const discountedPrice = getDiscountedTotal(
        product.reduction,
        quantity,
        adjustedPrice
      );

      if (discountedPrice < priceMin) {
        toast.error(tOrder("minPriceError", { price: priceMin }));
        setIsLoading(false);
        return;
      }

      const total = discountedPrice + deliveryFees;
      const orderPayload = buildOrderPayload({
        userId,
        product,
        quantity,
        caracteristique: selection.caracteristique,
        colorData: selection.colorData,
        formData,
        adjustedPrice,
        deliveryFees,
        total,
      });

      await createOrder(orderPayload);
      await updatePurchaseCount({ productId: product._id, quantity });

      toast.success(tOrder("orderSentSuccessfully"));
      onOrderSuccess();
    } catch (error) {
      console.error("Order error:", error);
      toast.error(tOrder("orderError"));
    } finally {
      setIsLoading(false);
    }
  }, [
    activeVariants,
    deliveryFees,
    formData,
    onOrderSuccess,
    priceMin,
    product,
    quantity,
    resolveUserId,
    selectedColorImage,
    selectedVariants,
    tOrder,
    validatePurchase,
  ]);

  return {
    isLoading,
    validatePurchase,
    addToCart: handleAddToCart,
    submitOrder: handleSendOrder,
  };
};
