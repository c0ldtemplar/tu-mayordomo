---
name: Clerk webhook handler uses console.log instead of structured logger
description: app/api/webhooks/clerk/route.ts uses console.log/console.error to log user IDs and event types, bypassing the structured observability logger
type: project
---

Lines 61, 77, 90: `console.log` and `console.error` in the webhook handler log `evt.data.id` (Clerk user ID) and event type to stdout. These are not routed through logEvent() and therefore: (a) not captured in structured JSON logs with request_id context, (b) potentially appear in Docker log files without masking, (c) not subject to the same log level controls as the rest of the app.

**How to apply:** Replace with logEvent() calls using the existing observability pattern.

Status: OPEN as of 2026-04-02.
