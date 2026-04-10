# /docs-update — Actualizar documentación canónica

Revisa los cambios recientes en el código y actualiza los documentos canónicos que hayan quedado desincronizados.

## Pasos

1. Obtén los commits recientes desde la última actualización documental:

   ```bash
   git log --oneline -20
   ```

2. Identifica qué archivos funcionales cambiaron:

   ```bash
   git diff --name-only HEAD~5 HEAD | grep -v '^docs/'
   ```

3. Para cada documento canónico, verifica si requiere actualización:

   | Documento                                    | Actualizar cuando...                                               |
   | -------------------------------------------- | ------------------------------------------------------------------ |
   | `PROJECT_STATUS_DASHBOARD_2026.md`           | Cambió avance por fase, se cerró un bloqueo, o cambiaron las rutas |
   | `PHASE_CAPABILITY_STATUS_MATRIX_2026.md`     | Cambió el estado de una capacidad o su bloqueo principal           |
   | `ITERATION_CHANGELOG_2026.md`                | Hay commits nuevos relevantes sin registrar                        |
   | `QA_FUNCTIONAL_MASTER_2026.md`               | Se agregó una ruta nueva, cambió un flujo o un rol                 |
   | `CONTENT_MARKETING_OPERATING_SYSTEM_2026.md` | Se publicó contenido nuevo o cambió el pipeline editorial          |

4. Propone los cambios concretos para cada documento desincronizado, con el texto exacto a modificar.

5. Aplica solo los cambios aprobados por el usuario.

6. Al finalizar, actualiza la `fecha de corte` en `PROJECT_STATUS_DASHBOARD_2026.md` y `PHASE_CAPABILITY_STATUS_MATRIX_2026.md`.

**Regla:** No marcar como actualizado ningún documento sin haber verificado el código fuente correspondiente.
