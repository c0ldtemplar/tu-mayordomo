---
name: Gaps de orientación y mantenedores — abril 2026
description: Problemas críticos de orientación en app detectados por fundador que afectan onboarding B2B colegios piloto
type: project
---

Fundador identificó cuatro gaps críticos de orientación en la app (2026-04-09):
1. No se muestra logo ni identidad visual del colegio en workspaces institucionales
2. No está claro quién está logueado ni qué rol/perfil tiene activo en ningún workspace
3. No existe CRUD de mantenedor de usuarios (profiles + role assignments)
4. No existe mantenedor de personas con selección de idioma preferido

**Estado real del código:**
- `WorkspaceNav` muestra solo el tipo de workspace y `localRoleView` genérico — sin nombre del usuario, sin nombre/logo de organización
- `organizations` en DB tiene `display_name` y `legal_name` pero NO tiene campo `logo_url` o similar
- `profiles` en DB tiene `full_name`, `role`, `email` — sin `avatar_url` ni `preferred_language`
- `admin/access-control` es el único mantenedor de acceso existente — no permite CRUD completo de usuarios ni personas
- Los workspaces (organization, school, professional, family, platform) no tienen header contextual de identidad

**Why:** Estos gaps generan fricción severa en pruebas con usuarios reales y colegios piloto — los directores no pueden identificar si están viendo su colegio o el de otro

**How to apply:** Priorizar identity header como P0 antes de cualquier nueva funcionalidad de colegios piloto. El mantenedor de usuarios es P1 para que los organization_admin puedan autogestionar su equipo.
