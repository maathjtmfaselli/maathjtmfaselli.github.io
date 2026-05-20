# ADR-0005 — Data Layer - Static Data

## Estado
Aceptado

## Contexto

La aplicación sigue una arquitectura frontend-only y no dispone de backend propio.

Toda la información consumida por la aplicación debe obtenerse desde una capa de datos estática servida por GitHub Pages.

### Tipos de datos que manejamos

| Tipo             | Qué contiene                        | ¿Con qué frecuencia cambia?  |
|------------------|-------------------------------------|------------------------------|
| Datos Maestros   | Información fija del juego          | Muy pocas veces (casi nunca) |
| Datos del Gremio | Miembros, puntos, progreso, eventos | 1-2 veces por semana         |

## Decisión
La UI y los holocrones nunca accederán directamente a fuentes externas; únicamente consumirán la data layer.

La aplicación implementará una capa de datos (`data layer`) completamente desacoplada de la UI.

La capa de datos se dividirá en:
- Master Data (`/data/master`): Información relativamente estática del juego
- Guild Data (`/data/guild`): Información dinámica asociada al gremio

## Consecuencias

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
