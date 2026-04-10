---
name: access_audit_logs table has no DB-level immutability enforcement
description: The audit log table in schema.prisma has no PostgreSQL trigger or row-level security preventing DELETE or UPDATE operations at the database layer
type: project
---

The access_audit_logs model in src/db/schema.prisma has no @db.Check constraints preventing UPDATE or DELETE, no PostgreSQL trigger making it append-only, and no RLS policy preventing modification. Immutability is enforced only at the application layer (the API does not expose a delete endpoint). However, any actor with direct DB access (including migrations run in CI) or a future SQL injection vulnerability could delete audit records.

For Ley TEA 21.545 compliance, audit trails must be tamper-evident. Recommend a PostgreSQL trigger that raises an exception on UPDATE/DELETE on access_audit_logs.

**How to apply:** When reviewing schema migrations, check if a RULE or TRIGGER enforcing append-only was added. Until confirmed, flag as open.

Status: OPEN as of 2026-04-02.
