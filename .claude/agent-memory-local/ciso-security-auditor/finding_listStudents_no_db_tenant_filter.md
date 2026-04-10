---
name: listStudents and listStudentEnrollments fetch all tenants from DB
description: student-core service.ts queries all student_core_profiles without a WHERE organization_id filter; tenant scoping happens post-query in the application layer
type: project
---

`listStudents()` at src/server/student-core/service.ts:81 and `listStudentEnrollments()` at :118 execute SQL queries with no WHERE clause filtering by organization_id. All student records across all tenants are loaded into memory, then `applyOrganizationScope()` filters the in-memory result. If `organizationScope` is null (platform-level actor or fallback), the full cross-tenant result set is returned.

**Why:** The DB-layer query is unbounded; the guard is in application code, creating a defense-in-depth gap. Any bug in applyOrganizationScope or any code path that gets organizationScope=null exposes all students across all tenants.

**How to apply:** Flag all new student/clinical queries that lack a WHERE organization_id = $N clause. Tenant scoping must be enforced in SQL, not post-query.

Status: OPEN as of 2026-04-02. Not remediated.
