# Documentación Técnica - Tu Mayordomo

## 1. Visión General
**Tu Mayordomo** es una aplicación Frontend (Single Page Application) construida con React, TypeScript y Vite. Su objetivo es digitalizar la oferta y operaciones de una empresa de mantenimiento de hogares premium.

La aplicación combina una **Landing Page comercial**, una **Calculadora dinámica de servicios** (Cotizador), herramientas **B2B (Corredoras)**, un **Directorio (Marketplace)**, y un **Dashboard de Operaciones interno** oculto para la administración.

## 2. Stack Tecnológico
- **Framework Core:** React 18
- **Lenguaje:** TypeScript (Tipado estricto)
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion (`motion/react`)
- **Iconografía:** Lucide React
- **Gráficos:** Recharts
- **Despliegue:** Docker multi-etapa + Nginx

---

## 3. Arquitectura y Estructura de Archivos

### `src/types.ts` (Capa de Dominio)
Actúa como la única fuente de verdad para las reglas de negocio estáticas.
- **Enums:** `PlanType`, `Period`, `GardenSize`, `VehicleSegment`, etc.
- **Constantes Financieras:** `UNIT_PRICES` (valores base de cada servicio) y `DISCOUNTS` (descuentos por empaquetamiento).
- **Interfaces:** Estructuras de datos para Clientes, Visitas (`Appointment`) y el Checklist Operativo.

### `src/App.tsx` (El Monolito Principal)
Es el componente orquestador de la aplicación. Gestiona:
1. **Navegación y UI:** Estado de visibilidad de los modales (`showBrokers`, `showMarketplace`, `showAgenda`, `showInternal`).
2. **Estado del Cotizador (`config`):** Almacena la configuración seleccionada por el usuario (plan, tamaño de jardín, autos, etc.).
3. **Motor de Cálculo (`calculation`):** Un bloque `useMemo` masivo que procesa la configuración del usuario y retorna:
   - Número de visitas necesarias considerando la estacionalidad (Verano vs Invierno).
   - Costos individuales vs Costos paquetizados.
   - Carga de horas operativas requeridas.
   - Simulador de rentabilidad proyectada a 12 meses (usado por el Dashboard Interno).
4. **Checklist Digital:** Control de calidad de los operarios en terreno.

### `src/components/` (Módulos Extraídos)
Componentes aislados para aligerar la carga de `App.tsx`:

- **`Agenda.tsx`:** 
  - Sistema interactivo de calendario y gestión de clientes (CRM básico).
  - Utiliza `useLocalStorage` para persistir datos en el navegador.
  - Incluye integración directa con URLs de WhatsApp (`wa.me`) y correos (`mailto`) para enviar recordatorios automáticos.

- **`Brokers.tsx`:** 
  - Panel B2B enfocado en corredoras de propiedades.
  - Tiene su propio estado local (`brokerConfig`) y su propio motor de cálculo (`brokerCalculation`) para estimar costos de "Puestas a punto" de propiedades antes de entregarlas.

- **`Marketplace.tsx`:** 
  - UI estática e interactiva que muestra el directorio de proveedores de servicios del ecosistema (electricistas, gasfitería, etc.).

### `src/hooks/useLocalStorage.ts`
Custom Hook genérico y seguro implementado con genéricos de TypeScript (`<T>`) y bloques `try-catch` para leer y escribir en el almacenamiento del navegador sin romper la aplicación si este falla.

---

## 4. Lógica de Negocio y Estacionalidad

El cotizador de **Tu Mayordomo** no solo suma precios, sino que evalúa la **Estacionalidad**. 
Dentro de `App.tsx`, el sistema identifica en qué mes comienza el servicio y cuenta cuántos meses caen en Verano (Octubre - Marzo) y cuántos en Invierno (Abril - Septiembre).

- **Regla de Jardín/Piscina:** 4 visitas mensuales en verano, 2 visitas en invierno.
- **Desglose de Costos:** Se calcula iterando mes a mes el costo según la estación correspondiente y luego se prorratea para ofrecer un pago mensualizado al cliente final.

---

## 5. Simulación de Negocio (Panel de Operaciones)

Un aspecto clave es el `simResults` devuelto por el `useMemo` principal. Este motor toma los valores unitarios y simula una operación real a escala:
1. **Capacidad:** Define que un equipo (3 personas) rinde 160 horas hombre mensuales.
2. **Carga Base:** Multiplica la base de clientes proyectada (`simConfig.totalHouses`) por la mezcla de planes (Básico, Estándar, Premium) para determinar cuántas horas y personal se necesita.
3. **P&L (Estado de Resultados):** Estima salarios, costos de insumos, gastos fijos y presupuesto de marketing para calcular la Utilidad Neta Inversionista.
4. **Proyección (Gráfico):** Aplica una tasa de crecimiento (ej: 10% MoM) para proyectar ingresos a 12 meses visualizados mediante `Recharts`.

---

## 6. Despliegue en Infraestructura (Docker / NPM)

El proyecto está alineado con un ecosistema de **Nginx Proxy Manager** mediante contenedores Docker.

### Configuración de Red
- El contenedor se conecta a una red externa llamada `shared-proxy`.
- El puerto `80` interno de Nginx no se expone directamente a la red local (para evitar colisiones), sino que se bindea al loopback `127.0.0.1:3050`.
- NPM puede resolver el servicio a través del DNS interno de Docker utilizando el nombre del contenedor `tu-mayordomo-app`.

### Construcción Multi-Etapa
El `Dockerfile` optimiza el peso final de la imagen:
1. **Builder:** Imagen de Node.js (`node:20-alpine`) que instala dependencias con `pnpm` y compila el TypeScript/React en archivos estáticos HTML/JS/CSS puros en la carpeta `dist`.
2. **Server:** Imagen ultraligera de Nginx (`nginx:alpine`) que únicamente copia la carpeta `dist` y la sirve al mundo, consumiendo menos de 15MB de RAM en producción.