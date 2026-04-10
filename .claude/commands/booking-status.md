# /booking-status — Estado del módulo booking-commerce

Revisa el estado actual de booking-commerce: qué está operativo, qué falta y cuál es el gap vs el epic completo.

## Pasos

1. Lee el epic de expansión:

   ```bash
   cat docs/roadmap/BOOKING_COMMERCE_EXPANSION_2026.md
   ```

2. Audita las rutas y APIs existentes de booking:

   ```bash
   find src/ app/ -path "*/booking*" -name "*.ts" -o -path "*/booking*" -name "*.tsx" | sort
   find src/ app/ -path "*/api*booking*" -name "*.ts" | sort
   ```

3. Verifica el estado en la matriz de capacidades:

   ```bash
   grep -A3 "booking" docs/roadmap/PHASE_CAPABILITY_STATUS_MATRIX_2026.md
   ```

4. Revisa las reservas existentes en DB (si el entorno local está disponible):

   ```bash
   DATABASE_URL=$(sed -n 's/^DATABASE_URL=//p' .env) \
     pnpm exec prisma db execute --schema=src/db/schema.prisma --stdin <<'SQL'
   SELECT status, COUNT(*) as total
   FROM bookings
   GROUP BY status;
   SQL
   ```

5. Genera un tablero de estado:

   | Capacidad                         | Estado | Gap |
   | --------------------------------- | ------ | --- |
   | Perfiles públicos                 |        |     |
   | Self-booking (usuario final)      |        |     |
   | Confirmación/cancelación/reagenda |        |     |
   | Checkouts y packs                 |        |     |
   | Wallets                           |        |     |
   | UI comercial final                |        |     |
   | Write-paths visibles              |        |     |

6. Propone el siguiente slice de mayor impacto para cerrar el gap.
