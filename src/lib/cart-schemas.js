import { z } from "zod";

const titleSchema = z.object({
  fr: z.string().optional().default(""),
  ar: z.string().optional().default(""),
});

const imageSchema = z.object({
  secure_url: z.string().optional().default(""),
});

const reductionItemSchema = z
  .object({
    reduction: z.coerce.number().optional().default(0),
    quantite: z.coerce.number().optional().default(0),
    dateDebut: z.preprocess((value) => {
      if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
        return new Date(value);
      }
      return undefined;
    }, z.date().optional()),
    dateFin: z.preprocess((value) => {
      if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
        return new Date(value);
      }
      return undefined;
    }, z.date().optional()),
  })
  .passthrough();

const cartProductSchema = z
  .object({
    _id: z.string().optional().default(""),
    title: titleSchema.default({ fr: "", ar: "" }),
    array_ProductImg: z.array(imageSchema).optional().default([]),
    reduction: z
      .union([z.coerce.number(), z.array(reductionItemSchema)])
      .optional()
      .default(0),
  })
  .passthrough();

const cartItemSchema = z
  .object({
    _id: z.string().optional().default(""),
    id_product: cartProductSchema.default({}),
    quantite: z.coerce.number().optional().default(0),
    caracteristique: z.record(z.string()).optional().default({}),
    caracteristique_couleur: z
      .object({
        type: z.string().optional().default(""),
        img: z.string().optional().default(""),
      })
      .optional()
      .default({ type: "", img: "" }),
    priceData: z
      .object({
        unitPrice: z.coerce.number().optional().default(0),
      })
      .optional()
      .default({ unitPrice: 0 }),
  })
  .passthrough();

export const cartResponseSchema = z.array(cartItemSchema);

/**
 * @param {unknown} payload
 */
export const parseCartResponse = (payload) => cartResponseSchema.safeParse(payload);
