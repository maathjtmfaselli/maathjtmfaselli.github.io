# ADR-0001 — Hosting en GitHub Pages (Datos Estáticos)

## Estado
Aceptado

## Contexto
- La aplicación no tiene un servidor propio (backend)
- GitHub Pages es un servicio gratuito de GitHub
- GitHub Pages solo puede mostrar archivos estáticos (HTML, CSS, JavaScript, JSON)

## Decisión
- El repositorio de código fuente se alojará en GitHub.
- La aplicación se desplegará completamente sobre GitHub Pages.

## Consecuencias
- hosting gratuito
- arquitectura frontend-only: sin lógica server-side
- limitaciones de autenticación y persistencia de datos
- arquitectura frontend-only
