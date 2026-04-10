# /raspberry-status — Estado del runtime en Raspberry

Captura un snapshot completo del estado operativo de Raspberry Pi (192.168.4.7).

## Pasos

1. Conecta y obtén estado de containers, puertos y logs recientes:

   ```bash
   ssh -o StrictHostKeyChecking=no coldtemplar@192.168.4.7 \
     "echo '=== CONTAINERS ===' && sudo docker ps --format '{{.Names}}\t{{.Status}}\t{{.Ports}}'; \
      echo '=== APP LOGS (últimas 30 líneas) ===' && sudo docker logs --tail=30 tea-connect-app 2>&1; \
      echo '=== DB STATUS ===' && sudo ss -ltnp '( sport = :5432 )' || true; \
      echo '=== DISK ===' && df -h /opt/tea-connect; \
      echo '=== MEM ===' && free -h"
   ```

2. Verifica el health endpoint desde local:

   ```bash
   curl -sS https://tea.syncrond.cl/api/v1/health | python3 -m json.tool 2>/dev/null || \
   curl -sS https://tea.syncrond.cl/api/v1/health
   ```

3. Detecta el release activo comparando el tag del container con el último build de Jenkins.

4. Reporta en formato tabla:
   - Containers activos y su estado (up/down/restarting)
   - Versión/tag del release desplegado
   - Espacio en disco disponible
   - Memoria disponible
   - Estado del endpoint health
   - Cualquier anomalía detectada (containers reiniciando, disco >80%, errores en logs)
