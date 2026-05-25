# Spain Space - Gremio de Star Wars Galaxy of Heroes

¡Bienvenido al repositorio oficial del sitio web de la **Spain Space**, un gremio en **Star Wars: Galaxy of Heroes!**

## 🌌 Qué es esta web

Esta [web](https://maathjtmfaselli.github.io) sirve para

- Comunicar la información del gremio que sus miembros deberían conocer (normas, objetivo, progreso).
- Compartir guías sobre (Alzamiento, raids, recursos...)

## ✨ Principios del proyecto

- Simple
- Mantenible
- Sin dependencias complejas
- Editable por cualquiera

## 🤝 Cómo Colaborar

> No hace falta saber programar para colaborar en esta web.

Este repositorio está pensado para que **cualquier miembro del gremio pueda colaborar** de una manera u otra.

- Cualquiera puede hacer sugerencias o reportar errores.
- Cualquiera puede actualizar los datos del gremio.
- Con conocimientos básicos de programación podrías colaborar creando nuevos holocrones.

Ver [CONTRIBUTING.md](CONTRIBUTING.md)

## 📊 Datos

La web está diseñada para que la mayor parte del contenido se pueda actualizar modificando únicamente archivos de datos, lo cual está al alcance de cualquier persona sin necesidad de tener una formación técnica.

### Master Data (`/data/master/`)

Datos estáticos que cambian raramente, como por ejemplo cuántos puntos se necesitan para alcanzar 1 estrella en un planeta de Alzamiento.

Se actualizan cuando hay cambios importantes en SWGOH.

### Guild Data (`/data/guild/`)

Datos dinámicos que reflejan el estado actual y presente del gremio:

- Información de miembros activos (`/data/guild/guild-members.csv`)
- Puntuación en Raid: Orden66 (`/data/guild/guild-raid-order66-historical.csv`), Naboo (`/data/guild/guild-raid-naboo-historical.csv`).
- Objetivos y logros en Alzamiento (`guild-rote-historical.json`)

#### Cómo actualizar los datos del gremio

Ver [aquí](CONTRIBUTING.md#actualizar-datos-del-gremio).

## 🎓 Holocrones

Los **holocrones** son componentes autocontenidos que explican un aspecto del juego o del gremio:
{Revisar aquí cómo explicar los holocrones de esta página web a personas no técnicas, que además incluya la explicación funcional}
- 📚 Consultables individualmente en la biblioteca de holocrones
- 🔗 Incrustables en otras páginas
- 📖 Autocontenidos con su propia lógica y estilos
- 🔄 Dinámicos con datos de las carpetas `/data/`
- Ver [Arquitectura de Holocrones (ADR-0004)](/docs/adr/0006-holocron-architecture-single.md)

## 🛠️ Información técnica solo para desarrolladores...

### Arquitectura

Este proyecto [sigue una filosofía](#-principios-del-proyecto)

- **frontend-first**. Está diseñado para funcionar completamente sobre **GitHub Pages**, sin backend propio.
- **data-oriented**
- **ia-first**, para que la documentación se convierta en ejecutable y sea una ayuda para que cualquier persona pueda contribuir al proyecto.

Cómo lo conseguimos?

1. **[ADR-0001: Hosting en GitHub Pages (Datos Estáticos)](/docs/adr/0001-static-github-pages.md)** - Arquitectura frontend-only sin infraestructura backend
2. **[ADR-0002: Vanilla Web Stack (No Framework Policy)](/docs/adr/0002-vanilla-web-stack.md)** - Tecnologías web nativas (HTML, CSS, JavaScript). Sin frameworks pesados ni librerías externas
3. **[ADR-0003: Presentation Layer - Responsive Design](/docs/adr/0003-presentation-layer-responsive-design.md)** - Diseño responsive para todos los dispositivos
4. **[ADR-0004: Holocron module as reusable Component](/docs/adr/0004-holocron-as-module.md)** - Componentes autocontenidos reutilizables
5. **[ADR-0005: Data Layer - Static data](/docs/adr/0005-data-layer-static.md)** - Toda la información consumida por la aplicación debe obtenerse desde una capa de datos estática servida por GitHub Pages.
6. **[ADR-0006: Data Layer - DAO con Cache](/docs/adr/0006-data-layer-dao-cache.md)** - Acceso a Datos a través de un DAO y Cacheo de datos

### Stack Tecnológico

Utilizamos solo tecnologías web fundamentales, tal como se define en [ADR-0002](/docs/adr/0002-vanilla-web-stack.md):

- **HTML** - Marcado semántico
- **JavaScript** - Lógica interactiva nativa
- **CSS** - Estilos y diseño responsive

### Estructura del Proyecto

```
├── css/                    # Hojas de estilos
├── js/                     # Scripts de JavaScript
├── data/                   # Datos del gremio y maestros
│   ├── master/             # Datos maestros (estáticos)
│   └── guild/              # Datos del gremio (dinámicos)
├── services/               # Servicios de JavaScript
│   └── dao/                # Acceso a Datos
├── holocrones/             # Componentes autocontenidos
│   ├── rules
│   ├── goals
│   └── ...
├── docs/
│   └── adr/                # Architecture Decision Records
├── index.html              # Página principal
└── README.md               # Este archivo
```

## 🔗 Enlaces

- **Sitio Web**: https://maathjtmfaselli.github.io
- **Últimas novedades**: https://maathjtmfaselli.github.io/holocrones.html?open=holocron__changelog
- **GitHub**: [@maathjtmfaselli](https://github.com/maathjtmfaselli)
- **Star Wars: Galaxy of Heroes**: [swgoh.gg](https://swgoh.gg)
