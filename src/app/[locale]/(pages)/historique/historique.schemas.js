import { z } from "zod";

const localizedSchema = z
  .object({
    fr: z.string().optional().default(""),
    ar: z.string().optional().default(""),
  })
  .passthrough();

const productSchema = z
  .object({
    _id: z.string().optional().default(""),
    title: localizedSchema.optional().default({ fr: "", ar: "" }),
  })
  .passthrough();

const orderLineSchema = z
  .object({
    quantite: z.coerce.number().optional().default(0),
    price: z.coerce.number().optional().default(0),
    id_product: productSchema.optional().default({}),
  })
  .passthrough();

const customerDetailsSchema = z
  .object({
    note: z.string().optional().default(""),
  })
  .passthrough();

export const orderSchema = z
  .object({
    _id: z.string().optional().default(""),
    status: z.string().optional().default(""),
    createdAt: z.string().optional().default(""),
    array_product: z.array(orderLineSchema).optional().default([]),
    deliveryFees: z.coerce.number().optional().default(0),
    total: z.coerce.number().optional().default(0),
    customerDetails: customerDetailsSchema.optional().default({}),
  })
  .passthrough();

export const ordersSchema = z.array(orderSchema).optional().default([]);

export const parseOrdersResponse = (payload) => ordersSchema.safeParse(payload);
export const parseOrderResponse = (payload) => orderSchema.safeParse(payload);
