# /smoke — Public Smoke + Health Check

Verifica el estado del runtime público de producción en `tea.syncrond.cl`.

## Pasos

1. Corre el smoke público canónico:

   ```bash
   bash scripts/public-release-smoke.sh
   ```

2. Verifica health y deep health:

   ```bash
   curl -sS https://tea.syncrond.cl/api/v1/health
   curl -sS https://tea.syncrond.cl/api/v1/health/deep
   ```

3. Verifica headers HTTP de rutas críticas:

   ```bash
   for u in /es /es/colegios /es/tea-connect /es/tea-rocalian /es/blog /es/login; do
     printf '%s → ' "$u"
     curl -I -sS "https://tea.syncrond.cl$u" | sed -n '1s/HTTP\/[0-9.]* //p'
   done
   ```

4. Reporta:
   - Release tag visible (buscar `x-release-id` en headers o en body)
   - Estado de cada ruta (200 / redirect / error)
   - Resultado del health y deep-health
   - Si hay diferencia entre el release en Raspberry y el `main` actual (`git rev-parse --short HEAD`)

**Si alguna ruta devuelve 5xx**, muestra los últimos logs del contenedor en Raspberry:

```bash
ssh -o StrictHostKeyChecking=no coldtemplar@192.168.4.7 \
  "sudo docker logs --tail=50 tea-connect-app 2>&1"
```
