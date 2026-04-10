# /blog-draft — Crear borrador de artículo para el blog

Crea un nuevo artículo en `cms/blog/` listo para editar y publicar.

## Argumento esperado

El tema del artículo. Ejemplos:

- `/blog-draft guia-paec-para-docentes`
- `/blog-draft derechos-ley-tea-familias`
- `/blog-draft como-usar-copiloto-ia-profesionales`

## Pasos

1. Lee los artículos existentes en `cms/blog/` para entender el formato y estilo canónico:

   ```bash
   ls cms/blog/
   ```

   Lee al menos uno como referencia de frontmatter y estructura.

2. Lee `docs/commercial/CONTENT_MARKETING_OPERATING_SYSTEM_2026.md` para identificar:
   - La audiencia objetivo del tema pedido
   - El cluster editorial al que pertenece
   - El criterio de publicación que aplica

3. Crea el archivo `cms/blog/[slug].md` con este frontmatter completo:

   ```markdown
   ---
   title: ""
   slug: "[slug]"
   date: "[fecha-hoy]"
   author: "Equipo SyncroND"
   excerpt: ""
   tags: []
   campaignKey: ""
   leadTags: []
   cta: ""
   ogImage: "/og/[slug].png"
   published: false
   ---
   ```

4. Agrega estructura base del artículo:
   - Introducción (2-3 párrafos, orientada al dolor del lector)
   - Sección 1: contexto normativo o conceptual
   - Sección 2: aplicación práctica
   - Sección 3: herramientas o pasos concretos
   - Cierre con CTA alineado al `campaignKey`

5. Muestra el path creado y sugiere los valores de `campaignKey` y `leadTags` según la audiencia.

**Nota:** El artículo se crea con `published: false`. Para publicarlo, cambiar a `true` y hacer commit.
