export const getDiscountPercent = (oldPrice, price) => {
  if (oldPrice <= 0 || price <= 0 || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

export const getOptimizedCloudinaryUrl = (url, options = {}) => {
  if (!url) return "";
  if (!url.includes("/upload/")) return url;

  const {
    quality = "auto:good",
    format = "f_webp",
    width,
    height,
    crop,
    dpr,
  } = options;

  const transformations = [];

  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(format);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (dpr) transformations.push(`dpr_${dpr}`);

  return url.replace("/upload/", `/upload/${transformations.join(",")}/`);
};

export const getLocalizedTitle = (title, locale) => {
  if (!title) return "";
  return (locale === "ar" ? title.ar : title.fr) || "";
};

export const buildProductCardModel = ({
  product,
  locale,
  viewMode = "grid",
  variant = "grid",
  viewDetailsLabel = "",
  outOfStockLabel = "",
  fallbackImage = "/images/gg1.webp",
}) => {
  const title = getLocalizedTitle(product?.title, locale) || "Produit";
  const images = product?.array_ProductImg || [];
  const cardWidth = variant === "carousel" ? 300 : viewMode === "list" ? 400 : 300;
  const resolveId = (p) => {
    const val = p?._id ?? p?.id ?? "";
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val.toString === "function") return val.toString();
    return String(val);
  };

  const idStr = resolveId(product);

  return {
    id: idStr,
    href: `/product_detail/${idStr}`,
    title,
    price: product?.price || 0,
    oldPrice: product?.ancien_price || 0,
    rating: product?.rating || 4.5,
    primaryImage: getOptimizedCloudinaryUrl(images[0]?.secure_url, {
      width: cardWidth,
      crop: "fill",
      quality: "auto:good",
    }),
    secondaryImage: getOptimizedCloudinaryUrl(images[1]?.secure_url, {
      width: cardWidth,
      crop: "fill",
      quality: "auto:low",
    }),
    reduction: getDiscountPercent(product?.ancien_price || 0, product?.price || 0),
    isOutOfStock: product?.disponible !== "disponible",
    isRtl: locale === "ar",
    viewMode,
    variant,
    viewDetailsLabel,
    outOfStockLabel,
    fallbackImage,
  };
};
