---
name: /api/v1/health/deep is unauthenticated and returns infra topology
description: app/api/v1/health/deep/route.ts has no authentication check and returns DB, Redis, and MinIO connectivity status
type: project
---

The deep health endpoint at app/api/v1/health/deep/route.ts calls getDeepHealthSnapshot() with no auth check. The response reveals whether PostgreSQL, Redis, and MinIO are reachable, which is useful for reconnaissance. The Jenkinsfile also captures the raw deep health JSON into a release evidence file readable on the Raspberry host.

**Why:** By design for ops monitoring, but the threat model does not account for attacker reconnaissance.

**How to apply:** For production, add at minimum an IP allowlist or the same METRICS_SCRAPE_SECRET check pattern as /api/v1/metrics.

Status: OPEN as of 2026-04-02. Accepted risk or P2 depending on threat model.
