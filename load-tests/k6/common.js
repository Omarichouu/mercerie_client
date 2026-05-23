import http from 'k6/http';
import { sleep } from 'k6';

export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
export const VUS = Number(__ENV.VUS) || 10;
export const DURATION = __ENV.DURATION || '30s';

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function getHeaders() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
}

export function think(min = 1, max = 3) {
  sleep(Math.random() * (max - min) + min);
}
