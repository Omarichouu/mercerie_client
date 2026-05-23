import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, VUS, DURATION, think } from './common.js';

export let options = {
  vus: VUS,
  duration: DURATION,
};

// Example category slugs found in the repo
const CATEGORY_SLUGS = [
  'mercerie-cristal',
  'mercerie-perles',
  'pierres-rondes',
  'sac-cadres',
];

export default function () {
  const slug = CATEGORY_SLUGS[Math.floor(Math.random() * CATEGORY_SLUGS.length)];
  const url = `${BASE_URL}/api/get_product_by_category?id=${encodeURIComponent(slug)}&page=1`;
  const res = http.get(url);

  check(res, {
    'category status is 200': (r) => r.status === 200,
    'category returns json': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json'),
  });

  think();
}
