Realistic mixed k6 scenario for an audience of ~40k subscribers

Assumptions
- 40k subscribers; realistic peak concurrent active users estimated at 5% => 2,000 concurrent VUs.
- Traffic mix: 50% home/listing, 35% category, 13% product detail, 2% cart reads.

Run locally (scaled-down proof):
```bash
# scaled-down run (200 VUs hold 1m)
.k6-bin\k6-v0.46.0-windows-amd64\k6.exe run load-tests/k6/mixed_realistic.js -e BASE_URL=http://localhost:3000 -e TARGET_VUS=200 -e HOLD_DURATION=1m
```

Run larger (requires a machine with sufficient CPU/RAM or distributed runners):
```bash
# example target 2000 VUs for 10 minutes (may require >16 CPU cores and lots of RAM)
k6 run load-tests/k6/mixed_realistic.js -e BASE_URL=http://your-staging-url -e TARGET_VUS=2000 -e HOLD_DURATION=10m
```

Recommended for true 40k-scale testing
- Use k6 cloud: `k6 cloud` can orchestrate large tests without local infra.
- Or run distributed k6 across multiple machines/containers and aggregate results.

Interpretation
- Monitor `http_req_duration` p(95), error rates, CPU/RAM on app server, DB latency and connection pool usage.
- If p95 > 1s or error rate > 1%, investigate server and DB as priority.
