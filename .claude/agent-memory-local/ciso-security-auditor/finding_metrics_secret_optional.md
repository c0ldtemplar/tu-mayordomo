---
name: METRICS_SCRAPE_SECRET is optional — /api/v1/metrics publicly accessible without it
description: app/api/v1/metrics/route.ts only enforces Bearer token auth if METRICS_SCRAPE_SECRET is set; if the env var is absent, the endpoint is open
type: project
---

metrics/route.ts lines 15-20: `if (env.METRICS_SCRAPE_SECRET) { ... }` — the entire auth block is inside a conditional. If METRICS_SCRAPE_SECRET is not set in the production env file, the Prometheus metrics endpoint is publicly accessible. The endpoint exposes DB queue state, heap usage, process uptime. It does not expose PII directly but confirms the application is alive and leaks operational topology.

Additionally, METRICS_SCRAPE_SECRET is absent from both .env.example and .env.localhost.example, increasing the likelihood it is not configured in production.

**How to apply:** When reviewing production env file changes, verify METRICS_SCRAPE_SECRET is present. Consider making it required in the Zod schema when NODE_ENV=production.

Status: OPEN as of 2026-04-02.
