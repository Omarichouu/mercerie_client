import AddToCartActions from "components/product-detail/AddToCartActions";
import ProductGallery from "components/product-detail/ProductGallery";
import ProductInfo from "components/product-detail/ProductInfo";
import QuantitySelector from "components/product-detail/QuantitySelector";
import VariantSelector from "components/product-detail/VariantSelector";

const ProductDetailContent = ({
  product,
  locale,
  currentPrice,
  isProductAvailable,
  missingVariants,
  isPurchaseBlocked,
  selectedVariants,
  selectedColorImage,
  onVariantSelect,
  onColorSelect,
  isOptionAvailable,
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  isLoading,
  t,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
    <div className="sm:px-6 lg:px-8">
      <ProductGallery
        images={product.array_ProductImg}
        productTitle={product.title?.[locale] || product.title?.fr}
      />
    </div>

    <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8">
      <ProductInfo product={product} currentPrice={currentPrice} locale={locale} />

      <div
        className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
          isProductAvailable
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300"
            : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300"
        }`}
      >
        <span className="text-sm font-semibold">
          {isProductAvailable ? t("productAvailable") : t("productNotAvailable")}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.16em]">
          {isProductAvailable ? "" : t("outOfStock")}
        </span>
      </div>

      <VariantSelector
        product={product}
        selectedVariants={selectedVariants}
        selectedColorImage={selectedColorImage}
        onVariantSelect={onVariantSelect}
        onColorSelect={onColorSelect}
        isOptionAvailable={isOptionAvailable}
        locale={locale}
      />

      <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
        <QuantitySelector quantity={quantity} onChange={onQuantityChange} />
      </div>

      <AddToCartActions
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        isLoading={isLoading}
        disabled={isPurchaseBlocked}
        currentPrice={currentPrice}
      />

      {isPurchaseBlocked ? (
        <p className="text-sm text-red-500 text-center">
          {!isProductAvailable
            ? t("productNotAvailable")
            : t("selectVariant", { variant: missingVariants.join(", ") })}
        </p>
      ) : null}
    </div>
  </div>
);

export default ProductDetailContent;
