---
name: GET /api/v1/interoperability/simulated-partner leaks auth config
description: The GET handler for the simulated partner endpoint has no authentication and returns the interop auth scheme and bearer token presence
type: project
---

app/api/v1/interoperability/simulated-partner/route.ts lines 45-61: the GET handler returns `mode`, `authScheme`, and `ready` (which confirms whether INTEROP_HTTP_BEARER_TOKEN is set). No authentication required to call this endpoint. This is information disclosure about the interoperability configuration. The POST handler correctly requires a Bearer token match.

**How to apply:** The GET endpoint should require platform.admin.manage permission or be removed from production routing entirely.

Status: OPEN as of 2026-04-02.
