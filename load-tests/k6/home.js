import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, VUS, DURATION, think } from './common.js';

export let options = {
  vus: VUS,
  duration: DURATION,
};

export default function () {
  const res = http.get(`${BASE_URL}/fr`);

  check(res, {
    'home status is 200': (r) => r.status === 200,
    'home body not empty': (r) => r.body && r.body.length > 0,
  });

  think();
}
