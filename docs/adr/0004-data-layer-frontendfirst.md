# ADR-0004 — Frontend Data Layer Architecture

## Status
Accepted

## Context

La aplicación sigue una arquitectura frontend-first y no dispone de backend propio.

Toda la información consumida por la aplicación debe obtenerse desde una capa de datos estática servida por GitHub Pages.

Existen dos categorías principales de información con comportamientos distintos:

- datos maestros del juego
- datos dinámicos del gremio

Ambos tipos poseen:
- ciclos de actualización diferentes
- estrategias de cache distintas
- niveles de volatilidad distintos
- responsabilidades funcionales separadas

## Decision

La aplicación implementará una capa de datos (`data layer`) completamente desacoplada de la UI.

La capa de datos se dividirá en:

### Master Data (`/data/master`)

Información relativamente estática del juego:

### Guild Data (`/data/guild`)

Información dinámica asociada al gremio:
- miembros
- GP
- reliquias
- participación
- progreso
- resultados de eventos
- estadísticas

La UI y los holocrones nunca accederán directamente a fuentes externas; únicamente consumirán la data layer.

## Consequences

### Positivas

- desacoplamiento entre UI y datasets
- cache más eficiente
- menor coste de actualización
- versionado sencillo mediante Git
- compatibilidad total con GitHub Pages
- facilidad para automatización mediante GitHub Actions
- reutilización de datasets entre holocrones
- posibilidad de snapshots históricos

### Negativas

- ausencia de persistencia en tiempo real
- necesidad de regenerar datasets dinámicos
- limitaciones propias de arquitectura frontend-only
- necesidad de controlar versionado de esquemas JSON
