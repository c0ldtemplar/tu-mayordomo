---
name: Middleware skips Clerk auth under two conditions
description: src/proxy.ts routes to noOpMiddleware (no session validation) when Clerk is not configured or when hasLocalActorSignal is true; workspace routes unprotected in these states
type: project
---

In src/proxy.ts line 181-187: if `!clerkConfigured` OR `(hasLocalActorSignal && !isHandshake)`, the middleware uses `noOpMiddleware` which calls `handleRequest(request, null)`. The redirect guard at line 108 (`if (isProtectedSegment && !hasActorSignal(request) && !userId)`) checks both actorSignal AND userId — so if hasLocalActorSignal is true (cookie or x-tea-actor-profile-id header present), the redirect does NOT fire and the route is served without Clerk session validation.

An external attacker who sends `x-tea-actor-profile-id: <any value>` as a request header will bypass the Clerk redirect for ALL /es/workspace/* routes. The runtime-auth layer then validates that profile ID against the DB, but the middleware protection is nullified.

**Why:** Designed for dev/internal dev mode. Should never reach production with Clerk configured AND the header trusted from external traffic.

**How to apply:** When auditing middleware changes, confirm this bypass path cannot be triggered from external traffic in production. Cloudflare/nginx should strip x-tea-* internal headers from inbound traffic.

Status: OPEN as of 2026-04-02. Not remediated at middleware layer.
