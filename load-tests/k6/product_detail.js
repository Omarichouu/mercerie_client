import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, VUS, DURATION, think, pick } from './common.js';

export let options = {
  vus: VUS,
  duration: DURATION,
};

export default function () {
  // 1) get a page of products
  const listRes = http.get(`${BASE_URL}/api/get_Products?limit=20&page=1`);

  check(listRes, {
    'products list status 200': (r) => r.status === 200,
    'products list json': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json'),
  });

  let productId = null;
  try {
    const payload = JSON.parse(listRes.body);
    if (Array.isArray(payload) && payload.length > 0) {
      productId = pick(payload)._id || pick(payload).id || null;
    } else if (payload && payload.products && Array.isArray(payload.products) && payload.products.length > 0) {
      productId = pick(payload.products)._id || pick(payload.products).id || null;
    }
  } catch (e) {
    // ignore parse errors
  }

  if (productId) {
    const res = http.get(`${BASE_URL}/api/get_one_product?id=${encodeURIComponent(productId)}`);
    check(res, {
      'product detail status 200': (r) => r.status === 200,
    });
  }

  think();
}
