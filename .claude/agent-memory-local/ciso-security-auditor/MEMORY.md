# Memory Index — CISO Security Auditor

- [Auth Fallback Pattern (P0)](finding_auth_fallback_unauthenticated.md) — Critical: runtime-auth service grants access to unauthenticated requests via DB fallback actor, bypassing session enforcement
- [listStudents No Tenant Filter in DB Layer](finding_listStudents_no_db_tenant_filter.md) — service.ts fetches ALL students across orgs; tenant scope applied post-query in application layer
- [Middleware Clerk Bypass](finding_middleware_clerk_bypass.md) — Middleware skips Clerk when clerkConfigured=false OR hasLocalActorSignal; /es/workspace routes unprotected if Clerk not configured
- [SSH StrictHostKeyChecking=no in Jenkinsfile](finding_jenkins_ssh_mitm.md) — All 12 SSH/SCP calls in Jenkinsfile use StrictHostKeyChecking=no, MITM risk on deploy
- [No Resource Limits in docker-compose.prod.yml](finding_docker_no_resource_limits.md) — No memory/CPU limits on any container; DoS via resource exhaustion possible
- [METRICS_SCRAPE_SECRET Optional in Production](finding_metrics_secret_optional.md) — /api/v1/metrics endpoint publicly accessible if METRICS_SCRAPE_SECRET not set in prod env
- [Deep Health Unauthenticated](finding_health_deep_public.md) — /api/v1/health/deep returns infra topology (DB, Redis, MinIO status) with no auth
- [Simulated Partner GET Unauthenticated](finding_simulated_partner_public.md) — GET /api/v1/interoperability/simulated-partner leaks auth config (bearer status, delivery mode)
- [console.log PII Risk in Webhook Handler](finding_clerk_webhook_consolelog.md) — Clerk webhook handler uses console.log/error, not structured logger; user IDs logged to stdout
- [Audit Log: access_audit_logs table has no delete prevention at DB level](finding_audit_log_no_db_protection.md) — No immutability enforced at DB layer; application-layer-only protection
