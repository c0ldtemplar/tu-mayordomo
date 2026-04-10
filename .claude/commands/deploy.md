# /deploy — Trigger Jenkins → Raspberry

Ejecuta el pipeline completo de deploy a Raspberry y hace polling hasta que termina.

## Pasos

1. Verifica que Jenkins esté corriendo:

   ```bash
   docker ps --format '{{.Names}}\t{{.Status}}' | grep tea-jenkins
   ```

2. Obtén un crumb CSRF y lanza el build:

   ```bash
   COOKIE_JAR=/tmp/jenkins-cookies.txt
   CRUMB=$(curl -sS -c "$COOKIE_JAR" -u coldtemplar:BB2024 \
     'http://127.0.0.1:8080/crumbIssuer/api/json' \
     | sed -n 's/.*"crumb":"\([^"]*\)".*/\1/p')
   curl -i -b "$COOKIE_JAR" -u coldtemplar:BB2024 \
     -H "Jenkins-Crumb: $CRUMB" -X POST \
     'http://127.0.0.1:8080/job/Tea-Connect/buildWithParameters?DEPLOY_TO_RASPBERRY=true&RUN_PUBLIC_SMOKE=true&RASPBERRY_HOST=192.168.4.7&RASPBERRY_APP_DIR=%2Fopt%2Ftea-connect%2Fapp'
   ```

3. Haz polling del último build cada 15 segundos hasta que `building=false`. Muestra `result` y los últimos 40 líneas del log:

   ```bash
   docker exec tea-jenkins sh -lc \
     "JOB=/var/jenkins_home/jobs/Tea-Connect; \
      LAST=\$(ls -1 \$JOB/builds | grep -E '^[0-9]+\$' | sort -n | tail -n1); \
      echo build=\$LAST; \
      grep -E '<result>|<building>' \$JOB/builds/\$LAST/build.xml || true; \
      tail -n 40 \$JOB/builds/\$LAST/log"
   ```

4. Si el build termina en `SUCCESS`, corre el smoke público:

   ```bash
   bash scripts/public-release-smoke.sh
   ```

5. Reporta: número de build, resultado, release tag visible, y si el smoke pasó o falló.

**Si Jenkins no está corriendo**, avisa antes de intentar el deploy y sugiere `docker start tea-jenkins`.
