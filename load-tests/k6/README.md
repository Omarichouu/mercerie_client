k6 load tests for mercerie_last_client

Prerequisites
- Install k6: https://k6.io/docs/getting-started/installation/
- (Optional) Install `uuid` support is done via jspm CDN in `cart.js` so no npm install required for k6.

Run examples (from repository root)

Run home test (20 VUs, 30s):
```bash
k6 run -e BASE_URL=http://localhost:3000 --vus 20 --duration 30s load-tests/k6/home.js
```

Run category test:
```bash
k6 run -e BASE_URL=http://localhost:3000 --vus 20 --duration 30s load-tests/k6/product_category.js
```

Run product detail test:
```bash
k6 run -e BASE_URL=http://localhost:3000 --vus 20 --duration 30s load-tests/k6/product_detail.js
```

Run cart test (simulates many different cart owners):
```bash
k6 run -e BASE_URL=http://localhost:3000 --vus 20 --duration 30s load-tests/k6/cart.js
```

Notes
- Adjust `VUS` and `DURATION` via CLI flags or by setting `VUS`/`DURATION` environment variables used inside the scripts.
- These scripts target the public API endpoints used by the pages rather than loading all static assets to keep tests efficient.
- Avoid running write-heavy scenarios (like adding many cart items) against production databases without cleanup.
