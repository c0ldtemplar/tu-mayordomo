# /db-check — Verificar integridad de DB y Prisma

Verifica la sincronización entre el schema de Prisma, las migraciones y la base de datos real.

## Pasos

1. Verifica que la DB esté corriendo:

   ```bash
   bash scripts/verify_db_sync.sh
   ```

2. Verifica que el schema de Prisma esté en sync con la DB (sin diff pendiente):

   ```bash
   DATABASE_URL=$(sed -n 's/^DATABASE_URL=//p' .env) \
     pnpm exec prisma db pull --schema=src/db/schema.prisma 2>&1 | tail -5
   ```

3. Verifica que no haya migraciones pendientes sin aplicar:

   ```bash
   DATABASE_URL=$(sed -n 's/^DATABASE_URL=//p' .env) \
     pnpm exec prisma migrate status --schema=src/db/schema.prisma
   ```

4. Verifica integridad de tablas críticas (que existan y tengan datos de seed):

   ```bash
   DATABASE_URL=$(sed -n 's/^DATABASE_URL=//p' .env) \
     pnpm exec prisma db execute --schema=src/db/schema.prisma --stdin <<'SQL'
   SELECT table_name, pg_size_pretty(pg_total_relation_size(quote_ident(table_name))) as size
   FROM information_schema.tables
   WHERE table_schema = 'public'
   ORDER BY pg_total_relation_size(quote_ident(table_name)) DESC
   LIMIT 20;
   SQL
   ```

5. Verifica la tabla `marketing_leads` (captación del blog):

   ```bash
   DATABASE_URL=$(sed -n 's/^DATABASE_URL=//p' .env) \
     pnpm exec prisma db execute --schema=src/db/schema.prisma --stdin <<'SQL'
   SELECT COUNT(*) as total_leads, MAX(created_at) as ultimo_lead FROM marketing_leads;
   SQL
   ```

6. Reporta:
   - Estado de migraciones (ok / pendientes / drift)
   - Tablas existentes y tamaño
   - Registros en `marketing_leads`
   - Cualquier inconsistencia detectada entre schema y DB real

**Si hay drift**, propone el comando exacto para resolverlo sin ejecutarlo automáticamente.
