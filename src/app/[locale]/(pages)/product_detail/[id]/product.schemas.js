import { z } from "zod";

const localizedSchema = z
  .object({
    fr: z.string().optional().default(""),
    ar: z.string().optional().default(""),
  })
  .passthrough();

const imageSchema = z
  .object({
    secure_url: z.string().optional().default(""),
  })
  .passthrough();

const reductionSchema = z
  .object({
    quantite: z.coerce.number().optional().default(0),
    reduction: z.coerce.number().optional().default(0),
  })
  .passthrough();

const commentSchema = z
  .object({
    name: z.string().optional().default(""),
    email: z.string().optional().default(""),
    rating: z.coerce.number().optional().default(0),
    avis: z.string().optional().default(""),
    review: z.string().optional().default(""),
    createdAt: z.string().optional().default(""),
  })
  .passthrough();

const variantColorSchema = z
  .object({
    type: z.string().optional().default(""),
    img: imageSchema.optional().default({ secure_url: "" }),
    priceAdjustment: z.coerce.number().optional().default(0),
    isActive: z.boolean().optional().default(true),
  })
  .passthrough();

const variantValueSchema = z.union([
  z
    .object({
      value: z.string().optional().default(""),
      priceAdjustment: z.coerce.number().optional().default(0),
      isActive: z.boolean().optional().default(true),
    })
    .passthrough(),
  z.string().optional().default(""),
]);

const variantSchema = z
  .object({
    type: localizedSchema.default({ fr: "", ar: "" }),
    array_value: z.array(variantValueSchema).optional().default([]),
    isActive: z.boolean().optional().default(true),
  })
  .passthrough();

const combinationSchema = z
  .object({
    options: z
      .array(
        z
          .object({
            type: z.string().optional().default(""),
            value: z.string().optional().default(""),
          })
          .passthrough()
      )
      .optional()
      .default([]),
    isActive: z.boolean().optional().default(true),
  })
  .passthrough();

export const productSchema = z
  .object({
    _id: z.string().optional().default(""),
    title: localizedSchema.default({ fr: "", ar: "" }),
    description: localizedSchema.optional().default({ fr: "", ar: "" }),
    price: z.coerce.number().optional().default(0),
    ancien_price: z.coerce.number().optional().default(0),
    rating: z.coerce.number().optional().default(0),
    reduction: z.array(reductionSchema).optional().default([]),
    array_ProductImg: z.array(imageSchema).optional().default([]),
    disponible: z.string().optional().default("disponible"),
    comments: z.array(commentSchema).optional().default([]),
    categorie: z.string().optional().default(""),
    variant_color: z.array(variantColorSchema).optional().default([]),
    variant: z.array(variantSchema).optional().default([]),
    variant_combinations: z.array(combinationSchema).optional().default([]),
  })
  .passthrough();

export const minPriceSchema = z
  .object({
    price_min: z.coerce.number().optional().default(0),
  })
  .passthrough();

export const relatedProductsSchema = z.array(productSchema).optional().default([]);

export const parseProductResponse = (payload) => productSchema.safeParse(payload);
export const parseMinPriceResponse = (payload) =>
  minPriceSchema.safeParse(payload);
export const parseRelatedProductsResponse = (payload) =>
  relatedProductsSchema.safeParse(payload);
