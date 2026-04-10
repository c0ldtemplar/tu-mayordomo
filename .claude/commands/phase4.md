# /phase4 — Estado y próximos pasos de Fase 4

Revisa el estado actual de los gaps de Fase 4 (compliance dura y superioridad operacional) y propone el siguiente cierre concreto.

## Pasos

1. Lee el estado actual de Fase 4:
   - `docs/roadmap/PROJECT_STATUS_DASHBOARD_2026.md` (sección "Fase 4")
   - `docs/roadmap/PHASE_CAPABILITY_STATUS_MATRIX_2026.md` (filas con Fase 4)
   - `docs/roadmap/GAP_CLOSURE_ROADMAP_2026.md`

2. Verifica el estado real de cada gap operativo:

   **Alertas externas:**

   ```bash
   cat docs/operations/EXTERNAL_ALERTING_AND_RELEASE_EVIDENCE_RUNBOOK_2026.md | head -40
   ```

   **Credenciales pendientes:**

   ```bash
   cat docs/operations/PENDING_EXTERNAL_CREDENTIALS_2026.md
   ```

   **Gobierno IA:**

   ```bash
   cat docs/operations/AI_TOKEN_GOVERNANCE_2026.md | head -30
   ```

   **Rotación de credenciales:**

   ```bash
   cat docs/operations/CREDENTIAL_ROTATION_2026.md | head -30
   ```

3. Verifica si Jenkins está configurado como Pipeline from SCM (o todavía usa pipeline embebido):

   ```bash
   docker exec tea-jenkins sh -lc \
     "grep -c 'Pipeline script from SCM\|scm' /var/jenkins_home/jobs/Tea-Connect/config.xml 2>/dev/null || echo 'no encontrado'"
   ```

4. Genera un tablero de estado Fase 4:

   | Gap                           | Estado | Bloqueo | Acción siguiente |
   | ----------------------------- | ------ | ------- | ---------------- |
   | Alertas externas activas      |        |         |                  |
   | Rotación de credenciales      |        |         |                  |
   | Gobierno IA duro              |        |         |                  |
   | Restore drills con evidencia  |        |         |                  |
   | Jenkins → Pipeline from SCM   |        |         |                  |
   | docker-compose.prod.yml único |        |         |                  |

5. Propone el gap más fácil de cerrar hoy (menor fricción, mayor impacto) y ofrece ejecutarlo.
