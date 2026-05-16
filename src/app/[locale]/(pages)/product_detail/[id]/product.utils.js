import { getLocalizedTitle } from "lib/product-utils";

export const getLocalizedDescription = (description, locale) => {
  if (!description) return "";
  return (locale === "ar" ? description.ar : description.fr) || "";
};

export const getProductTitle = (product, locale) =>
  getLocalizedTitle(product?.title, locale) || "Détails du produit";

export const getProductDescription = (product, locale) =>
  getLocalizedDescription(product?.description, locale) ||
  "Découvrez ce produit en détail.";

export const normalizeCaracteristique = (caracteristique) => {
  if (!caracteristique) return "";
  return Object.keys(caracteristique)
    .sort()
    .map((key) => `${key}:${caracteristique[key]}`)
    .join("|");
};
