import { z } from "zod";

const titleSchema = z.object({
  fr: z.string().optional().default(""),
  ar: z.string().optional().default(""),
});

const imageSchema = z.object({
  secure_url: z.string().optional().default(""),
});

export const productSchema = z
  .object({
    _id: z.string().optional().default(""),
    price: z.coerce.number().default(0),
    ancien_price: z.coerce.number().optional().default(0),
    title: titleSchema.default({ fr: "", ar: "" }),
    array_ProductImg: z.array(imageSchema).optional().default([]),
    categorie: z.string().optional().default(""),
    disponible: z.string().optional().default("disponible"),
    rating: z.coerce.number().optional().default(0),
  })
  .passthrough();

export const productsResponseSchema = z.array(productSchema);

export const parseProductsResponse = (payload) =>
  productsResponseSchema.safeParse(payload);
