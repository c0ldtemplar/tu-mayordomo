---
name: Auditoría inicial de compliance legal y clínico (2026-04-02)
description: Hallazgos del primer audit completo de compliance Ley TEA / Circular 586 / Ley 19.628 sobre el código real del proyecto TEA Connect
type: project
---

Primera auditoría de compliance ejecutada sobre el código fuente real del proyecto TEA Connect el 2026-04-02.

**Why:** Necesario para validar si la plataforma puede operar legalmente bajo Ley TEA 21.545, Circular 586, PAEC, DEC y Ley 19.628 antes de despliegue a colegios reales.

**How to apply:** Usar estos hallazgos como línea base en futuras auditorías para rastrear avance de remediación.

---

## Hallazgos Críticos Confirmados en Código

### BLOQUEANTE 1 — AI sin verificación de consentimiento `ai_processing`
- Archivo: `src/server/ai-analytics/outbox-processor.ts`
- El outbox-processor ejecuta inferencia AI sobre datos clínicos de menores sin verificar si existe un `consent_record` de tipo `ai_processing` activo.
- El tipo `ai_processing` existe en el enum `ConsentType` del schema y en los contratos de interoperabilidad, pero NO se valida antes de enviar datos a proveedores externos (OpenAI, Google AI).
- La verificación de consentimiento `hasGrantedConsent()` existe en `interoperability/service.ts` pero NO se llama desde el flujo AI de copilot/SOAP.

### BLOQUEANTE 2 — Prompt construido con payload clínico crudo sin anonimización
- Archivo: `src/server/ai-analytics/outbox-processor.ts` línea 61-63
- El prompt enviado a proveedores externos (OpenAI/Google) incluye `JSON.stringify(payload)` del registro clínico sin redacción de PII.
- Esto implica que datos nominales de menores (nombre, diagnóstico, observaciones) se envían a servicios de terceros fuera de Chile sin anonimización.

### BLOQUEANTE 3 — Ausencia de política de retención y mecanismo de eliminación (right to erasure)
- No existe en el código ninguna implementación de purge, data_retention, ni procesamiento de solicitudes de eliminación.
- La tabla `privacy_data_subject_requests` existe en el schema pero NO hay ningún service que la procese o ejecute eliminación efectiva de datos.
- El modelo `processing_activity_records` existe pero no tiene campo `retention_period_days` ni lógica de vencimiento.

### BLOQUEANTE 4 — PAEC: faltan campos obligatorios de Circular 586
- Archivo: `src/lib/school-compliance/contracts.ts` + `src/db/schema.prisma` (tabla `paec_records`)
- El PAEC solo almacena: `support_summary` (texto libre), `accommodations` (JSON genérico), `review_due_at`, `signed_at`.
- Circular 586 exige: diagnóstico de base, objetivos educativos específicos, responsable(s) designados con cargo, períodos de revisión, firma de profesionales habilitados, firma del tutor, y aprobación del equipo multidisciplinario.
- El campo `accommodations` es un JSON sin estructura definida — no hay validación de que contenga los ámbitos requeridos.

### BLOQUEANTE 5 — Audit log de accesos a datos clínicos no se escribe activamente
- No existe ningún `INSERT INTO access_audit_logs` en el código de los servicios clínicos (`clinical-core/service.ts`, `school-compliance/service.ts`).
- La tabla `access_audit_logs` existe en el schema y se lee en `student-core/service.ts`, pero no se puebla desde las operaciones de lectura/escritura de expedientes clínicos.
- Esto impide cumplir con el principio de trazabilidad requerido por Ley 19.628 Art. 10 y las obligaciones de auditoría de Circular 586.

---

## Hallazgos Importantes (no bloqueantes hoy, pero deben resolverse)

### WARNING 1 — Reportes AI-generados sin disclaimer de validación profesional obligatoria
- Los reportes SOAP AI-generados (`soap_generation_runs`, `soap_notes`) tienen campo `generated_by_ai: Boolean` pero no existe ninguna lógica que impida exportar o firmar un reporte sin revisión humana previa.
- No hay campo `reviewed_by_profile_id` ni `human_reviewed_at` en `soap_notes` ni en `clinical_reports`.

### WARNING 2 — Consentimiento de tutores: modelo existe pero no se valida en creación de expedientes clínicos
- El tipo `clinical_data_processing` existe en `ConsentType` enum.
- No se valida la existencia de consentimiento activo al crear `clinical_notes`, `therapy_sessions`, ni `paec_records` para un estudiante.

### WARNING 3 — DEC (Diario de Eventos Conductuales): estructura mínima
- `dec_log_entries` solo tiene `trigger_summary` y `response_summary` (texto libre), sin clasificación por ámbito (comunicación, conducta, sensorial), sin referencia a protocolo de intervención, sin campo de contexto ambiental.
- Circular 586 orienta a documentar el contexto situacional y la respuesta pedagógica específica.

### WARNING 4 — Separación de datos de diagnóstico e identificación: parcial
- `clinical_profiles` (diagnóstico) está separada de `student_core_profiles` (identificación) — bien.
- Sin embargo, las consultas SQL en `ai-analytics/service.ts` y `clinical-core/service.ts` hacen JOIN de ambas tablas y devuelven nombre completo + datos clínicos en el mismo resultado, sin diferenciación por propósito.

### WARNING 5 — Logger sin filtro de PII
- Archivo: `src/lib/observability/logger.ts`
- El logger acepta campos arbitrarios (`Record<string, unknown>`) y los serializa directamente con `JSON.stringify`. No hay mecanismo para redactar PII antes de emitir a los logs (stdout/Sentry).

---

## Estado de Controles Positivos Confirmados

- Tabla `consent_records` existe con tipos adecuados (ConsentType enum bien definido)
- Tabla `privacy_data_subject_requests` existe (infraestructura para DSAR)
- Control de acceso por rol implementado en `school-compliance/service.ts` con redacción de contenido para roles no autorizados
- Verificación de consentimiento sí se implementa para FHIR/interoperabilidad (`hasGrantedConsent()`)
- Separación arquitectónica `children` / `student_core_profiles` / `clinical_profiles` es correcta
- Tabla `signatures` con `signer_profile_id` y `signed_at` para trazabilidad de firmas
- `access_purpose_registry` existe para clasificar propósitos de acceso
