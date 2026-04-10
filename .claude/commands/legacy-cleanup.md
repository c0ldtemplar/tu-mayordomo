# /legacy-cleanup — Identificar y eliminar código legacy

Detecta código obsoleto, rutas muertas y referencias legacy en el proyecto y propone su eliminación segura.

## Pasos

1. Busca patrones de código legacy conocidos:

   ```bash
   # Imports de Supabase (migrado a Prisma/PostgreSQL)
   grep -r "supabase" src/ app/ --include="*.ts" --include="*.tsx" -l

   # Referencias a rutas legacy de la app antigua
   grep -r "tenant-core\|legacy\|TODO.*remove\|FIXME.*remove\|@deprecated" src/ app/ --include="*.ts" --include="*.tsx" -l

   # Archivos en docs/legacy/ sin referencia activa
   ls docs/legacy/

   # Variables de entorno obsoletas
   grep -r "SUPABASE\|DRIZZLE" src/ app/ .env.example --include="*.ts" --include="*.tsx" 2>/dev/null
   ```

2. Lee `docs/legacy/` y verifica cuáles tienen contenido ya migrado a documentos canónicos activos.

3. Busca componentes huérfanos (definidos pero no importados en ningún lado):

   ```bash
   # Lista componentes y verifica si son importados
   find src/ app/ -name "*.tsx" | head -50
   ```

4. Para cada hallazgo, clasifica:
   - **Eliminar seguro**: código sin referencias activas verificado
   - **Eliminar con precaución**: requiere verificar si algún test lo usa
   - **Migrar antes de eliminar**: contiene lógica que debe moverse
   - **Conservar**: tiene razón de existir documentada

5. Presenta el inventario y espera aprobación antes de eliminar cualquier cosa.

6. Elimina solo lo aprobado, agrupando en un solo commit con mensaje `chore(cleanup): remove legacy [descripción]`.

**Nunca eliminar** sin leer el archivo completo primero. Nunca eliminar archivos en `docs/legacy/` si son la única fuente de verdad de algo no migrado.
