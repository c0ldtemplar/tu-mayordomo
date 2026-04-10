# /ci-check — Correr checks locales de CI antes de hacer push

Ejecuta la suite completa de verificaciones locales equivalentes al pipeline de Jenkins.

## Pasos

1. Verifica que el entorno local esté correctamente configurado:

   ```bash
   bash scripts/ensure-local-review-env.sh
   ```

2. Corre los checks obligatorios:

   ```bash
   bash scripts/local-ci-check.sh
   ```

3. Verifica sincronización de DB:

   ```bash
   bash scripts/verify_db_sync.sh
   ```

4. Corre el smoke funcional local si el servidor está corriendo:

   ```bash
   curl -sS http://localhost:3334/api/v1/health 2>/dev/null && \
     bash scripts/local-functional-smoke.sh || \
     echo "Servidor local no está corriendo. Levantar con pnpm review:dev primero."
   ```

5. Valida el Jenkinsfile:

   ```bash
   bash scripts/validate-jenkinsfile.sh 2>/dev/null || true
   ```

6. Reporta:
   - Qué checks pasaron (✓) y cuáles fallaron (✗)
   - Si hay algún bloqueo para hacer push a `main`
   - Si hay archivos staged que no deberían commitearse (`.env`, secretos, `node_modules`)

**Si todo pasa**, confirma que el código está listo para `git push origin main`.
