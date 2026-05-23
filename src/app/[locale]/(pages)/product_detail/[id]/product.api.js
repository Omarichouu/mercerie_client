const BASE_URL = process.env.NEXT_PUBLIC_MY_URL || "";

const requestJson = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
};

// DEPRECATED: Use CartContext (useCart hook) instead for cart operations
// export const fetchCartItems = (id_user) =>
//   requestJson(`${BASE_URL}/api/get_cart_client`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ id_user }),
//   });

export const addProductToCart = (payload) =>
  requestJson(`${BASE_URL}/api/addProduct_in_cart_client`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updateCartQuantity = (payload) =>
  requestJson(`${BASE_URL}/api/update_cart_quantite`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const createOrder = (orderData) =>
  requestJson("/api/addOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

export const updatePurchaseCount = ({ productId, quantity }) =>
  requestJson("/api/update_Product_PurchaseCount", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_product: productId, quantite: quantity }),
  });

export const addComment = (comment) =>
  requestJson(`${BASE_URL}/api/add_commante`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });

export const linkCommentToProduct = ({ productId, commentId }) =>
  requestJson(`${BASE_URL}/api/add_commante_in_product`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: productId, id_comment: commentId }),
  });

export const fetchProductComments = (productId) =>
  requestJson(`${BASE_URL}/api/get_comments_by_product?id=${productId}`, {
    method: "GET",
    cache: "no-store",
  });

export const fetchRelatedProducts = (productId, limit = 8) =>
  requestJson(
    `${BASE_URL}/api/get_related_products?id=${productId}&limit=${limit}`
  );
