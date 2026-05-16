"use client";

import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

import { calculateTotalPrice } from "assets/les_fontion";
import { useCart } from "contexts/CartContext";
import { DEFAULT_QUANTITY } from "./product.constants";
import ProductDetailContent from "./components/ProductDetailContent";
import ProductDetailExtras from "./components/ProductDetailExtras";
import ProductDetailOrderModal from "./components/ProductDetailOrderModal";
import { useOrderActions } from "./hooks/useOrderActions";
import { useProductReviews } from "./hooks/useProductReviews";
import { useShippingForm } from "./hooks/useShippingForm";
import { useVariantSelection } from "./hooks/useVariantSelection";

const ProductDetailClient = ({ product, priceMin }) => {
  const t = useTranslations("ProductDetail");
  const tOrder = useTranslations("CartPage");
  const locale = useLocale();
  const { data: session, status } = useSession();
  const { incrementCartCount } = useCart();
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    selectedVariants,
    selectedColorImage,
    activeVariants,
    currentPrice,
    missingVariants,
    isProductAvailable,
    isPurchaseBlocked,
    handleVariantSelect,
    handleColorSelect,
    isOptionAvailable,
    resetSelections,
  } = useVariantSelection({
    product,
    locale,
    modelLabel: t("model"),
  });
  const {
    formData,
    handleInputChange,
    handleRelaySelect,
    deliveryFees,
    wilayas,
    communes,
    centers,
    isLoadingCenters,
    resetForm,
  } = useShippingForm({ t });
  const {
    comments,
    rating,
    review,
    name,
    email,
    isSubmittingReview,
    onRatingChange,
    onFieldChange,
    onSubmitReview,
  } = useProductReviews({
    productId: product._id,
    initialComments: product.comments,
    t,
  });
  const handleOrderSuccess = useCallback(() => {
    setIsModalOpen(false);
    setQuantity(DEFAULT_QUANTITY);
    resetSelections();
    resetForm();
  }, [resetForm, resetSelections]);
  const { isLoading, validatePurchase, addToCart, submitOrder } =
    useOrderActions({
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
      onOrderSuccess: handleOrderSuccess,
      t,
      tOrder,
    });
  const handleBuyNow = useCallback(() => {
    if (!validatePurchase()) return;
    setIsModalOpen(true);
  }, [validatePurchase]);
  const subtotal = useMemo(
    () => calculateTotalPrice(product.reduction, quantity, currentPrice),
    [currentPrice, product.reduction, quantity]
  );
  const total = useMemo(
    () => subtotal + deliveryFees,
    [deliveryFees, subtotal]
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto py-8 lg:py-12 pt-0 space-y-12">
        <ProductDetailContent
          product={product}
          locale={locale}
          currentPrice={currentPrice}
          isProductAvailable={isProductAvailable}
          missingVariants={missingVariants}
          isPurchaseBlocked={isPurchaseBlocked}
          selectedVariants={selectedVariants}
          selectedColorImage={selectedColorImage}
          onVariantSelect={handleVariantSelect}
          onColorSelect={handleColorSelect}
          isOptionAvailable={isOptionAvailable}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
          isLoading={isLoading}
          t={t}
        />

        <ProductDetailExtras
          product={product}
          locale={locale}
          reviewProps={{
            comments,
            rating,
            review,
            name,
            email,
            onRatingChange,
            onFieldChange,
            onSubmit: onSubmitReview,
            isSubmitting: isSubmittingReview,
          }}
        />
      </div>

      <ProductDetailOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSelectRelayPoint={handleRelaySelect}
        onQuantityChange={setQuantity}
        onSubmit={submitOrder}
        isLoading={isLoading}
        subtotal={subtotal}
        deliveryFees={deliveryFees}
        total={total}
        quantity={quantity}
        wilayas={wilayas}
        communes={communes}
        centers={centers}
        isLoadingCenters={isLoadingCenters}
      />
    </div>
  );
};

export default ProductDetailClient;
