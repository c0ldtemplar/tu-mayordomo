---
name: Auth Fallback — Unauthenticated Requests Gain DB-Resolved Actor
description: runtime-auth service silently grants access to unauthenticated API requests by resolving a fallback actor from the database when no session signal is present
type: project
---

When `resolveRequestActorProfileId` returns null (no cookie, no header, no Clerk session), ALL three authorize functions (`authorizePlatformPermission`, `authorizeOrganizationPermission`, `authorizeReadPermission`) proceed to call `resolveFallbackActor` and grant the request with an actor chosen from the DB. This means an unauthenticated HTTP request to /api/v1/students, /api/v1/clinical-core/notes, /api/v1/platform-admin/settings, etc. is not rejected — it is served as if the "first available admin in the DB" made the request.

**Why:** The fallback was designed for internal/background jobs that do not carry a session (e.g., seed scripts, cron workers). The logic was not gated to internal-only callers.

**How to apply:** Every new API route must be audited to confirm it calls `authorizeXxx` AND that those functions cannot silently pass unauthenticated external HTTP traffic. Until fixed, assume ALL /api/v1/ routes are functionally open to unauthenticated callers when Clerk is not configured or bypassed.

Status: OPEN as of 2026-04-02. Not remediated.
