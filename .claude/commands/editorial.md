# /editorial — Gestionar pipeline editorial del blog

Revisa el estado del contenido publicado, lo pendiente y sugiere el siguiente artículo a producir.

## Pasos

1. Audita el estado actual del blog:

   ```bash
   ls cms/blog/
   ```

   Para cada artículo, lee el frontmatter (`published`, `date`, `tags`, `campaignKey`).

2. Lee el pipeline y prioridades editoriales:
   - `content/tea-library/publish/blog-drafts/BLOG_PIPELINE_PRIORITY_2026.md`
   - `content/tea-library/publish/campaign-briefs/EDITORIAL_LAUNCH_PLAN_Q2_2026.md`
   - `content/tea-library/processed/topic-clusters/EDITORIAL_CLUSTER_MAP_2026.md`

3. Genera un resumen del estado editorial:

   | Artículo | Audiencia | Publicado | Leads capturados |
   | -------- | --------- | --------- | ---------------- |

4. Verifica leads por `campaignKey` en la DB:

   ```bash
   DATABASE_URL=$(sed -n 's/^DATABASE_URL=//p' .env) \
     pnpm exec prisma db execute --schema=src/db/schema.prisma --stdin <<'SQL'
   SELECT campaign_key, COUNT(*) as leads
   FROM marketing_leads
   GROUP BY campaign_key
   ORDER BY leads DESC;
   SQL
   ```

5. Identifica gaps del pipeline:
   - Artículos en borrador sin publicar (`published: false`)
   - Clusters editoriales sin cobertura
   - Audiencias sin artículo reciente (>30 días)

6. Sugiere el próximo artículo a producir con justificación (audiencia, cluster, intención SEO) y ofrece crearlo con `/blog-draft`.

7. Opcionalmente: lista los posts de LinkedIn pendientes en `content/tea-library/publish/linkedin-posts/`.
