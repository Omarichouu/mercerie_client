import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, VUS, DURATION, think } from './common.js';

export let options = {
  vus: VUS,
  duration: DURATION,
};

const TEST_USER_ID = '507f1f77bcf86cd799439011';

export default function () {
  const payload = JSON.stringify({ id_user: TEST_USER_ID });
  const headers = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post(`${BASE_URL}/api/get_cart_client`, payload, headers);

  check(res, {
    'cart status is 200': (r) => r.status === 200,
    'cart returns json': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json'),
  });

  think();
}
