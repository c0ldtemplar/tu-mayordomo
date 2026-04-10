<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Tu Mayordomo - Plataforma de Gestión

**Tu Mayordomo** es una plataforma integral para la gestión de servicios de mantenimiento de hogares de alto estándar. Incluye una landing page interactiva, un cotizador dinámico de servicios, un panel B2B para corredoras, y un dashboard de operaciones interno para proyectar crecimiento.

## 🚀 Características Principales

- **Cotizador Dinámico:** Permite armar planes a medida (Básico, Estándar, Premium) con cálculos precisos de rentabilidad y capacidad operativa.
- **Agenda Interactiva:** Gestión de clientes y visitas con persistencia local (`localStorage`) y notificaciones directas vía WhatsApp y Email.
- **Panel B2B (Corredoras):** Herramienta para ofrecer servicios de "Puesta a Punto" a corredoras de propiedades.
- **Marketplace de Ecosistema:** Directorio integrado de profesionales de mantenimiento recomendados.
- **Dashboard Operativo (Oculto):** Simulador financiero y de capacidad operativa exclusivo para la administración.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React + TypeScript + Vite
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Gráficos:** Recharts
- **Iconografía:** Lucide React

## 💻 Entorno de Desarrollo Local

**Requisitos:** Node.js y `pnpm`.

1. Instala las dependencias:
   ```bash
   pnpm install
   ```
2. Levanta el entorno de desarrollo:
   ```bash
   pnpm dev
   ```

## 🐳 Despliegue en Producción (Docker / Raspberry Pi)

El proyecto está optimizado con un `Dockerfile` multi-etapa y un archivo de composición para desplegarse fácilmente en un entorno Dockerizado usando Nginx Proxy Manager (NPM).

1. Clona el repositorio en tu servidor.
2. Levanta el contenedor en la red compartida (`shared-proxy`):
   ```bash
   docker compose up -d --build
   ```
3. Configura Nginx Proxy Manager (NPM) para enrutar el tráfico entrante al contenedor interno `tu-mayordomo-app` mediante el puerto `80`.
