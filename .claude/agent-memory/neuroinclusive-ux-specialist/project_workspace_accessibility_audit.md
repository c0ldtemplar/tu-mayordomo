---
name: Workspace accessibility audit findings (2026-04-09, UI-12)
description: WCAG 2.1 AA / neuroinclusivity gaps across 5 critical write-paths: login, WellbeingCheckin, WellbeingReactionButton, family dashboard, booking flow
type: project
---

## Audit scope
Five workspace page.tsx files + src/components/workspaces/primitives.tsx + quick-actions.tsx + app/globals.css responsive/focus sections. Audited 2026-04-02.

## Critical accessibility gaps found

### 1. WorkspaceList renders a <div> not a semantic list
File: primitives.tsx line 161–163
`<div className="tc-workspace-list">` — not a `<ul>`. Children WorkspaceListItem are `<div>` elements too. Screen readers cannot navigate these as list items, no list count announced.

### 2. WorkspaceMetrics section has no accessible label
File: primitives.tsx line 112–124
`<section className="tc-workspace-metrics">` has no `aria-label` or `aria-labelledby`. Its children are `<article>` elements with no heading level. A screen reader announces "section" with no context.

### 3. WorkspaceGrid section has no accessible label
File: primitives.tsx line 127–129
`<section className="tc-workspace-grid">` — empty wrapper with no `aria-label`.

### 4. Focus ring contrast is too low for WCAG 2.1 AA
File: globals.css line 641, 1091, 1255
Workspace navigation pills: `outline: 3px solid rgba(95, 124, 138, 0.18)` — at 18% opacity this is essentially invisible.
Workspace items: `rgba(95, 124, 138, 0.22)` — same issue.
Form controls: `rgba(95, 124, 138, 0.24)` — same issue.
The button focus ring `rgba(99, 102, 241, 0.24)` is also below 3:1 ratio.
WCAG 2.1 SC 1.4.11 requires non-text contrast of at least 3:1.

### 5. No required field indicators or aria-required in quick-actions forms
File: quick-actions.tsx (WorkspaceContextPicker and all action forms)
No `required` attribute, no `aria-required`, no asterisk with legend explanation.
`WorkspaceField` (primitives.tsx line 324–342) uses `<label>` wrapping pattern which IS correct, but no required indicator exists.

### 6. WorkspaceFlow arrow is a bare text character
File: primitives.tsx line 280
`<div className="tc-flow-arrow">→</div>` — the arrow character has no aria-hidden, so screen readers announce "right-pointing arrow" mid-flow. Should be `aria-hidden="true"`.

### 7. WorkspaceEmptyState has no role or live region
File: primitives.tsx line 295–318
Empty states appear after data loads but have no `aria-live` or `role="status"`, so screen readers don't announce that a section is empty.

### 8. All five workspaces share identical WorkspaceTone colors
File: primitives.tsx line 19–55
Family workspace has identical colors to platform_admin. WCAG 1.4.1 and neuroinclusivity principle require the family surface (used by parents of neurodiverse children) to feel visually distinct and calm — not the same operational grey as admin.

### 9. tc-workspace-metric-label font-size is 0.74rem (11.8px)
File: globals.css line 1017–1024
Below the 14px minimum for any context, below 16px minimum for family context. These are the stat card labels visible across all workspaces.

### 10. tc-workspace-eyebrow font-size is 0.72rem (11.5px)
File: globals.css line 977–983
Same issue — used on every workspace hero header.

### 11. tc-workspace-badge font-size is 0.72rem (11.5px)
File: globals.css line 1129–1142
Badges appear in lists, metrics, and timelines across all workspaces. Sub-12px text fails WCAG 1.4.4 at standard zoom.

### 12. WorkspaceActionCard link has no focus ring
File: quick-actions.tsx line 239–248
`<Link href={href} style={{ color: tone.ink, fontWeight: 800, textDecoration: "none" }}>` — inline style with no focus ring. Neither CSS class `tc-workspace-link` nor any other focus class is applied.

## Mobile responsive gaps

- `tc-workspace-metrics` uses `minmax(200px, 1fr)` — on 375px viewport renders 1 column which is correct, but metric values use `clamp(2rem, 4vw, 3rem)` so at 375px = ~15px which is fine; ok.
- `tc-dual-grid` collapses to 1 column at 960px — good.
- `tc-workspace-grid` collapses to 1 column at 960px — good.
- No `min-width: 44px` / `min-height: 44px` enforcement on tc-chip-link/workspace-link tap targets. At `padding: 0.55rem 0.85rem` on `font-size: 0.88rem` the computed height is ~34px — below the 44px WCAG 2.5.5 minimum for touch targets.

## Progressive disclosure assessment

- Family: PARCIAL — WorkspaceMetrics shows 5 stat cards immediately (manageable), but the WorkspaceGrid below renders 7 panels simultaneously. A parent on mobile sees 7 separate data panels stacked. Cognitive load: high.
- School: PARCIAL — 5 metrics + 6 panels visible simultaneously. "Qué revisar primero" panel helps, but items inside mix DEC logs and priority cases without visual hierarchy.
- Professional: PARCIAL — 5 metrics + 7 panels. Booking panel conditionally rendered. Good decision.
- Organization: PARCIAL — 6 metrics + 8 panels visible at once. Heaviest cognitive load of all workspaces.
- Platform: BUENO — Uses "Qué requiere decisión hoy" as a gating panel. WorkspaceLinkRow provides quick-access nav. Still 9 panels in the grid but audience is technical.
