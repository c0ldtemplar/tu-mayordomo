# /qa-round — Ronda de QA funcional guiada

Ejecuta o prepara una ronda de QA funcional completa según el catálogo canónico.

## Argumento opcional

Scope de la ronda: `public`, `school`, `professional`, `family`, `platform`, `all` (default: `all`)

## Pasos

1. Lee el estado de la última ronda en `docs/qa/UAT_RESULTS_LOG_2026.md` para saber qué quedó pendiente.

2. Lee el catálogo funcional en `docs/qa/QA_FUNCTIONAL_MASTER_2026.md` para los casos del scope pedido.

3. Verifica que el runtime esté operativo:

   ```bash
   curl -sS https://tea.syncrond.cl/api/v1/health
   ```

4. Genera un checklist de casos QA para el scope pedido, agrupado por perfil:
   - Caso ID
   - Descripción del flujo
   - Credencial a usar
   - Resultado esperado
   - Campo para marcar: PASS / FAIL / SKIP

5. Si el argumento es `local`, usa `http://localhost:3334` como base URL en lugar de producción.

6. Al finalizar, pregunta si registrar los resultados en `docs/qa/UAT_RESULTS_LOG_2026.md` con la fecha y resultados obtenidos.

**Formato de registro:**

```markdown
## Ronda QA [scope] — [fecha]

- entorno: [producción/local]
- release visible: [tag]
- estado global: PASSED / FAILED / PARCIAL
- resumen: [X/Y] casos con pase
```
