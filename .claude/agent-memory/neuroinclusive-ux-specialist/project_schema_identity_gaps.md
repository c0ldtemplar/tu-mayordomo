---
name: Schema facts for identity and user management (2026-04-09)
description: What exists and what is missing in the schema for org branding, user identity, user CRUD, and language preference
type: project
---

## What exists

- `organizations`: `id`, `slug`, `legal_name`, `display_name`, `status` — NO `logo_url` column
- `profiles`: `id`, `email`, `full_name`, `role` (ProfileRole enum), `status` (ProfileStatus enum), `external_auth_id` — NO `preferred_locale` column
- `organization_memberships`: links profiles to organizations via `membership_role` (owner, admin, professional, teacher, guardian_viewer)
- `profile_role_assignments`: links profiles to roles with optional `organization_id`, `active` flag, `source`
- `ProfileRole` enum: platform_admin, organization_admin, professional, teacher, parent, guardian
- `ProfileStatus` enum: active, inactive, invited
- `MembershipRole` enum: owner, admin, professional, teacher, guardian_viewer

## What is missing and must be added via migration

1. `organizations.logo_url String?` — for tenant branding in workspace header
2. `profiles.preferred_locale String?` — for persisted language preference (values: es, en, fr, pt)

## Layout / session facts

- `getCurrentSessionActor()` returns a `SessionActor` with `profileId`, `fullName`, `role`, `email`
- The layout.tsx has access to `actor.fullName` and `actor.role` — but NOT to `actor.organizationId` or `actor.organizationName`
- `getActorExperienceProfile()` returns `enabledModules`, `localRoleView`, `disabledModules` — NOT org name or logo
- The `WorkspaceShell` eyebrow is a hardcoded string per workspace page — org name is not surfaced in it

**Why:** Pilot schools need org identity in the UI. Schema gaps block logo and language preference features.
**How to apply:** Any spec or implementation for org branding must account for (a) the migration to add logo_url, and (b) fetching org name+logo separately from the actor session since it is not currently in the session shape.
