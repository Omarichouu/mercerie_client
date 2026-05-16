import Image from "next/image";
import { Link } from "i18n/navigation";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ card, imageLoading = "lazy", onToggleFavorite, isFavorite }) => {
  const viewMode = card.viewMode || "grid";
  const variant = card.variant || "grid";
  const isList = viewMode === "list";
  const hasSecondaryImage = Boolean(card.secondaryImage);
  const primaryImage = card.primaryImage || card.fallbackImage || "/images/gg1.webp";

  const cardClassName = [
    "bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-md",
    "hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group",
    isList ? "flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4" : "",
    variant === "carousel" ? "flex-shrink-0 w-full md:w-[calc(25%-12px)]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const imageWrapperClass = isList
    ? "w-full sm:w-32 md:w-40 lg:w-48 h-32 sm:h-full flex-shrink-0"
    : "pt-[100%]";

  const imageSizes =
    variant === "carousel"
      ? "(max-width: 640px) 50vw, 25vw"
      : isList
        ? "(max-width: 640px) 100vw, 192px"
        : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  return (
    <Link href={card.href} className={cardClassName}>
      <div className={`relative overflow-hidden ${imageWrapperClass}`}>
        <Image
          src={primaryImage}
          alt={card.title}
          fill
          sizes={imageSizes}
          className={`object-cover transition-all duration-500 ease-in-out ${
            isList ? "rounded-lg" : ""
          } ${
            hasSecondaryImage
              ? "group-hover:opacity-0 group-hover:scale-110"
              : "group-hover:scale-105"
          }`}
          loading={imageLoading}
        />

        {hasSecondaryImage ? (
          <Image
            src={card.secondaryImage}
            alt={card.title}
            fill
            sizes={imageSizes}
            className={`object-cover transition-all duration-500 ease-in-out opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-105 ${
              isList ? "rounded-lg" : ""
            }`}
            loading="lazy"
          />
        ) : null}

        {card.isOutOfStock ? (
          <div
            className={`absolute top-2 ${
              card.isRtl ? "right-2" : "left-2"
            } bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow`}
          >
            {card.outOfStockLabel || "Rupture de stock"}
          </div>
        ) : null}

        {card.reduction > 0 ? (
          <div
            className={`absolute top-2 ${
              card.isRtl ? "left-2" : "right-2"
            } bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow transition-all duration-300 group-hover:scale-110`}
          >
            -{card.reduction}%
          </div>
        ) : null}

        {typeof onToggleFavorite === "function" ? (
          <button
            onClick={(event) => {
              event.preventDefault();
              onToggleFavorite(card.id);
            }}
            className={`absolute top-2 ${
              card.isRtl ? "left-2" : "right-2"
            } p-1.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isFavorite
                ? "bg-red-500 text-white shadow-md"
                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        ) : null}
      </div>

      <div className={`p-2 sm:p-3 ${isList ? "flex-1" : ""}`}>
        <div className="block">
          <h3
            className={`font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300 ${
              isList ? "text-sm sm:text-base" : "text-xs sm:text-sm min-h-[3em]"
            }`}
          >
            {card.title}
          </h3>

          <div className="flex items-center gap-1 sm:gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#D4AF37] text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {card.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            {card.oldPrice > 0 ? (
              <span className="line-through text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                {card.oldPrice.toLocaleString()} DZD
              </span>
            ) : null}
            <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#D4AF37] transition-colors duration-300">
              {card.price.toLocaleString()} DZD
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex justify-center items-center gap-2 w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white py-1.5 sm:py-2 px-3 rounded-lg hover:from-[#C9A227] hover:to-[#E6C200] transition-all duration-300 font-medium text-xs sm:text-sm hover:shadow-md hover:shadow-yellow-500/25 transform hover:scale-[1.02] active:scale-[0.98]">
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" />
            {card.viewDetailsLabel || "Voir details"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
