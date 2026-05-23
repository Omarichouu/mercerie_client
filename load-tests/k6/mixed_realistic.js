import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomInt, pick, BASE_URL, think } from './common.js';

export let options = {
  scenarios: {
    ramping: {
      executor: 'ramping-vus',
      startVUs: 10,
      stages: [
        { duration: '1m', target: Number(__ENV.TARGET_VUS) || 200 },
        { duration: __ENV.HOLD_DURATION || '10m', target: Number(__ENV.TARGET_VUS) || 200 },
        { duration: '1m', target: 10 },
      ],
      gracefulRampDown: '30s',
    },
  },
};

// category slugs from project
const CATEGORY_SLUGS = [
  'mercerie-cristal',
  'mercerie-perles',
  'pierres-rondes',
  'sac-cadres',
];

export default function () {
  const actionRoll = Math.random();

  if (actionRoll < 0.5) {
    // Home or listing
    const res = http.get(`${BASE_URL}/fr`, { tags: { endpoint: 'home' } });
    check(res, { 'home 200': (r) => r.status === 200 });
  } else if (actionRoll < 0.85) {
    // Category listing
    const slug = pick(CATEGORY_SLUGS);
    const res = http.get(`${BASE_URL}/api/get_product_by_category?id=${encodeURIComponent(slug)}&page=1`, {
      tags: { endpoint: 'category_api' },
    });
    check(res, { 'category 200': (r) => r.status === 200 });
  } else if (actionRoll < 0.98) {
    // Product detail: try list then detail
    const listRes = http.get(`${BASE_URL}/api/get_Products?limit=20&page=1`, {
      tags: { endpoint: 'products_list_api' },
    });
    if (listRes.status === 200) {
      try {
        const payload = JSON.parse(listRes.body);
        const products = payload.products || payload;
        if (Array.isArray(products) && products.length) {
          const prod = pick(products);
          const id = prod._id || prod.id;
          if (id) {
            const res = http.get(`${BASE_URL}/api/get_one_product?id=${encodeURIComponent(id)}`, {
              tags: { endpoint: 'product_detail_api' },
            });
            check(res, { 'product 200': (r) => r.status === 200 });
          }
        }
      } catch (e) {}
    }
  } else {
    // Cart read
    const payload = JSON.stringify({ id_user: '507f1f77bcf86cd799439011' });
    const headers = { headers: { 'Content-Type': 'application/json' } };
    const res = http.post(
      `${BASE_URL}/api/get_cart_client`,
      payload,
      Object.assign({}, headers, { tags: { endpoint: 'cart_api' } })
    );
    check(res, { 'cart 200': (r) => r.status === 200 });
  }

  think(0.5, 2.0);
}
