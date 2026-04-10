# /audit — Auditoría integral rápida del estado del proyecto

Genera un snapshot ejecutivo del estado actual del proyecto en los cuatro lentes principales.

## Pasos

1. Lee las fuentes canónicas de estado:
   - `docs/roadmap/PROJECT_STATUS_DASHBOARD_2026.md`
   - `docs/roadmap/PHASE_CAPABILITY_STATUS_MATRIX_2026.md`
   - `docs/qa/UAT_RESULTS_LOG_2026.md` (última ronda)

2. Verifica el estado real del runtime:

   ```bash
   curl -sS https://tea.syncrond.cl/api/v1/health 2>/dev/null || echo "health no disponible"
   git log --oneline -5
   ```

3. Genera un reporte en cuatro secciones:

   ### Producto
   - Fases cerradas vs en curso
   - Capacidades operativas vs parciales vs pendientes
   - Top 3 gaps de producto más impactantes

   ### UX
   - Workspaces funcionales con loops completos
   - Pendientes de polish mobile
   - Estado del freemium familiar

   ### Growth
   - Artículos publicados y leads capturados
   - Estado del pipeline editorial
   - Gap más urgente para conversión

   ### Operación
   - Estado de Fase 4 (% real)
   - Alertas externas activas: sí/no
   - Credenciales rotadas: sí/no
   - Último release exitoso

4. Cierra con: **"El bloqueo más urgente que puedes resolver hoy es:"** — una sola acción concreta.

**Nota:** Este comando es de solo lectura. No modifica nada.
