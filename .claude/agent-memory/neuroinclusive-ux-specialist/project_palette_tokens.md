---
name: CSS palette tokens and workspace tone values
description: Exact hex values for every named CSS token in globals.css after 2026-04 brand refresh (Petroleum/Sage/Warm Beige); family tone differentiated from institutional slate
type: project
---

## Global CSS custom properties (app/globals.css) — verified 2026-04-09 after brand refresh

| Token | Value |
|---|---|
| --tc-color-petroleum | #0a1a2f |
| --tc-color-soft-blue | #334155 |
| --tc-color-sage | #4e8071 |
| --tc-color-warm-beige | #e59a59 |
| --tc-color-off-white | #f1f5f9 |
| --tc-color-accent-teal | #4e8071 (same as sage) |
| --tc-color-accent-teal-deep | #344e41 |
| --tc-color-accent-warm | #e59a59 |
| --tc-color-accent-warm-deep | #b07041 |
| --tc-color-ink | #0f172a |
| --tc-color-muted | #475569 |
| --tc-color-line | rgba(148,163,184,0.15) |
| --tc-color-line-strong | rgba(71,85,105,0.22) |
| --tc-color-surface | rgba(255,255,255,0.95) |
| --tc-color-surface-strong | #ffffff |

NOTE: The previous values in this file were stale pre-refresh values. petroleum was #0f172a before, is now #0a1a2f. sage was #6366f1 (indigo) before, is now #4e8071 (green). Warm beige was #c7d2fe, is now #e59a59. All new code must use the values above.

## Emotion tokens (wellbeing system)

| Token | Value |
|---|---|
| --tc-emotion-happy | #4ade80 |
| --tc-emotion-calm | #60a5fa |
| --tc-emotion-anxious | #facc15 |
| --tc-emotion-sad | #a78bfa |
| --tc-emotion-overwhelmed | #f87171 |

CAUTION: #facc15 (anxious) used as a button background in WellbeingCheckin confirm step fails WCAG 1.4.3 — white text on yellow is ~1.2:1. Known issue flagged in UI-12 audit.

## WorkspaceTone values (primitives.tsx workspaceToneByKey) — verified 2026-04-09

| Workspace key | surface   | border    | ink       | muted     | badge     |
|---------------|-----------|-----------|-----------|-----------|-----------|
| school        | #f8fafc   | #cbd5e1   | #0f172a   | #475569   | #eef2ff   |
| organization  | #f8fafc   | #cbd5e1   | #0f172a   | #475569   | #eef2ff   |
| professional  | #f8fafc   | #cbd5e1   | #0f172a   | #475569   | #eef2ff   |
| platform      | #f8fafc   | #cbd5e1   | #0f172a   | #475569   | #eef2ff   |
| family        | #fdf9f5   | #e0cfc0   | #2c1f14   | #7a5c47   | #fef3e2   |

**Why:** Family workspace serves parents on mobile — warmer surface distinct from operational grey.
**How to apply:** Do not apply family tone to institutional workspaces. Do not introduce a 6th tone without updating this table.

## Status colors (notice variants, globals.css)

| Variant | Background | Text | Border |
|---|---|---|---|
| success | rgba(237,247,241,0.92) | #285947 | rgba(122,157,142,0.28) |
| error | rgba(255,240,237,0.96) | #8a2b24 | rgba(166,72,49,0.24) |
| neutral | #fffdfa | var(--tc-workspace-muted) | var(--tc-workspace-border) |
