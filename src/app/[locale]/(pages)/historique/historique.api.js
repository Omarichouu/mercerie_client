const BASE_URL = process.env.NEXT_PUBLIC_MY_URL || "";

const requestJson = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
};

export const fetchOrdersByUser = (id_user) =>
  requestJson(`${BASE_URL}/api/get_historique_client`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_user }),
  });

export const fetchOrderDetail = (id) =>
  requestJson(`${BASE_URL}/api/get_one_order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

export const updateOrderStatus = (payload) =>
  requestJson(`${BASE_URL}/api/update_status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
