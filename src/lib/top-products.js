import ProductModal from "app/DBconfig/models/product";
import { connectMongoDB } from "app/DBconfig/mongodb";

const TOP_PRODUCTS_FIELDS = "_id title price ancien_price array_ProductImg disponible purchaseCount";

// Simple in-memory cache (per-process).
// This project intentionally uses local memory cache only.
let _cache = {
  data: null,
  expiresAt: 0,
  ttl: Number(process.env.TOP_PRODUCTS_TTL) || 60, // seconds
  limit: Number(process.env.TOP_PRODUCTS_LIMIT) || 8,
};

export async function getTopProducts(options = {}) {
  const ttl = options.ttl || _cache.ttl;
  const limit = options.limit || _cache.limit;

  const now = Date.now();
  if (_cache.data && _cache.expiresAt > now && (!options.force)) {
    return _cache.data;
  }

  await connectMongoDB();

  const data = await ProductModal.find({})
    .sort({ purchaseCount: -1 })
    .limit(limit)
    .select(TOP_PRODUCTS_FIELDS)
    .lean();

  // Ensure returned objects are plain serializable values for Next Server Components
  function deepSerialize(value) {
    if (value == null) return value;
    if (Array.isArray(value)) return value.map(deepSerialize);
    if (typeof value !== "object") return value;

    // Detect MongoDB ObjectId or ObjectId-like objects.
    // Some drivers represent ObjectId with {_bsontype: 'ObjectID'} and a toString(),
    // others may be objects with a toString() that returns the hex id. Detect both.
    if (typeof value.toString === "function") {
      try {
        const s = value.toString();
        // common ObjectId hex length is 24
        if (typeof s === "string" && /^[0-9a-fA-F]{24}$/.test(s)) return s;
      } catch (e) {
        // ignore and continue
      }
    }

    const out = {};
    for (const k of Object.keys(value)) {
      const v = value[k];
      if (v && v._bsontype === "ObjectID" && typeof v.toString === "function") {
        out[k] = v.toString();
      } else {
        out[k] = deepSerialize(v);
      }
    }
    return out;
  }

  const serialized = data.map((item) => deepSerialize(item));

  _cache.data = serialized;
  _cache.expiresAt = now + ttl * 1000;
  _cache.ttl = ttl;
  _cache.limit = limit;

  return serialized;
}

export function clearTopProductsCache() {
  _cache.data = null;
  _cache.expiresAt = 0;
}