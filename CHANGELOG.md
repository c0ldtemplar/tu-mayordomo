# Registro de Cambios (Changelog)

Todas las modificaciones notables de "Tu Mayordomo" serán documentadas en este archivo.
El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [Unreleased]
### Refactorización y Arquitectura
- Extracción del panel de **Marketplace** desde el monolito `App.tsx` a `src/components/Marketplace.tsx`.
- Extracción del panel de **Corredoras (Brokers)** desde `App.tsx` a `src/components/Brokers.tsx`, aislando su estado local y cálculos financieros.
- Implementación de `CHANGELOG.md` para el control de versiones e historial del proyecto.
- Se sobrescribió `README.md` con documentación formal explicando la arquitectura, instalación y características de la plataforma.

## [1.0.1] - 2026-04-10
### Mejoras
- Implementación del Custom Hook `useLocalStorage` para la gestión segura de base de datos en la Agenda interactiva.
- Limpieza de tipados en `App.tsx`: extracción de `ChecklistItem` y `ChecklistState` al archivo global de tipos.

## [1.0.0] - 2026-04-09
### Añadido
- MVP Inicial de Tu Mayordomo.
- Landing Page interactiva con animaciones en Framer Motion.
- Cotizador de planes dinámico con cálculos de capacidad y horas operativas.
- Panel oculto de Operaciones para simulación de crecimiento y recursos.
- Agenda de visitas en `src/components/Agenda.tsx`.