---
name: No resource limits on any Docker service in docker-compose.prod.yml
description: postgres, redis, minio, and app containers have no memory or CPU limits, enabling DoS via resource exhaustion on the Raspberry Pi host
type: project
---

docker-compose.prod.yml has no `deploy.resources.limits` or `mem_limit`/`cpus` keys on any of the four services. On the Raspberry Pi (limited RAM), a runaway process (e.g., AI copilot queue flooding, large DB query) can OOM the host and take down all services simultaneously.

**Why:** Not configured during initial setup.

**How to apply:** Add `deploy.resources.limits` with memory and cpus values appropriate for the Raspberry Pi's RAM. Prioritize app and postgres.

Status: OPEN as of 2026-04-02.
