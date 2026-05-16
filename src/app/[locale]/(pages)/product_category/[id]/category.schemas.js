import { z } from "zod";

const titleSchema = z.object({
  fr: z.string().optional().default(""),
  ar: z.string().optional().default(""),
});

const imageSchema = z
  .object({
    secure_url: z.string().optional().default(""),
  })
  .passthrough();

const productSchema = z
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

const paginationSchema = z
  .object({
    currentPage: z.coerce.number().optional().default(1),
    totalPages: z.coerce.number().optional().default(1),
    hasNext: z.boolean().optional().default(false),
    hasPrev: z.boolean().optional().default(false),
    totalItems: z.coerce.number().optional().default(0),
  })
  .passthrough();

export const categoryResponseSchema = z
  .object({
    products: z.array(productSchema).optional().default([]),
    pagination: paginationSchema.optional().default({
      currentPage: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
      totalItems: 0,
    }),
  })
  .passthrough();

export const parseCategoryResponse = (payload) =>
  categoryResponseSchema.safeParse(payload);
