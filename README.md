# Spain Space - Gremio en Star Wars Galaxy of Heroes

¡Bienvenido al repositorio oficial del sitio web de la **Spain Space** Guild en Star Wars: Galaxy of Heroes!

## ✨ Principios del proyecto

Este proyecto [sigue una filosofía](/docs/adr/) **frontend-first** e **ia-first**. Está diseñado para funcionar completamente sobre **GitHub Pages**, sin backend propio.

1. **[ADR-0001: Hosting en GitHub Pages (Datos Estáticos)](/docs/adr/0001-static-github-pages.md)** - Arquitectura frontend-only sin infraestructura backend
2. **[ADR-0002: Vanilla Web Stack (No Framework Policy)](/docs/adr/0002-vanilla-web-stack.md)** - Tecnologías web nativas (HTML, CSS, JavaScript). Sin frameworks pesados ni librerías externas
3. **[ADR-0003: Presentation Layer - Responsive Design](/docs/adr/0003-presentation-layer-responsive-design.md)** - Diseño responsive para todos los dispositivos
4. **[ADR-0004: Holocron module as reusable Component](/docs/adr/0004-holocron-as-module.md)** - Componentes autocontenidos reutilizables
5. **[ADR-0005: Data Layer - Static data](/docs/adr/0005-data-layer-static.md)** - Toda la información consumida por la aplicación debe obtenerse desde una capa de datos estática servida por GitHub Pages.
6. **[ADR-0006: Data Layer - DAO con Cache](/docs/adr/0006-data-layer-dao-cache.md)** - Acceso a Datos a través de un DAO y Cacheo de datos

## 🛠️ Stack Tecnológico

Utilizamos solo tecnologías web fundamentales, tal como se define en [ADR-0002](/docs/adr/0002-vanilla-web-stack.md):

- **HTML** - Marcado semántico
- **JavaScript** - Lógica interactiva nativa
- **CSS** - Estilos y diseño responsive

## 📁 Estructura del Proyecto

```
├── css/                    # Hojas de estilos
├── js/                     # Scripts de JavaScript
├── data/                   # Datos del gremio y maestros
│   ├── master/             # Datos maestros (estáticos)
│   └── guild/              # Datos del gremio (dinámicos)
├── services/               # Servicios de JavaScript
├── holocrones/             # Componentes autocontenidos
│   ├── rules
│   ├── goals
│   └── ...
├── docs/
│   └── adr/                # Architecture Decision Records
├── index.html              # Página principal
└── README.md               # Este archivo
```

## 🎓 Holocrones

Los **holocrones** son componentes autocontenidos que implementan la [Arquitectura de Holocrones (ADR-0006)](/docs/adr/0006-holocron-architecture-single.md):

- 📚 Consultables individualmente en la biblioteca de holocrones
- 🔗 Incrustables en otras páginas mediante iframes
- 📖 Autocontenidos con su propia lógica y estilos
- 🔄 Dinámicos con datos de las carpetas `/data/`

## 📊 Datos

El proyecto mantiene una **separación clara entre datos maestros y datos del gremio**:

### Master Data (`/data/master/`)
Datos estáticos que cambian raramente. Se actualizan cuando hay cambios importantes en SWGOH.

### Guild Data (`/data/guild/`)
Datos dinámicos que reflejan el estado actual del gremio:
- Información de miembros
- Progreso y estadísticas
- Objetivos y logros

## 📚 Documentación

- **[Architecture Decision Records](/docs/adr/)** - Decisiones arquitectónicas documentadas

## 🤝 Cómo Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md)

## Guild Data update workflow

This project originally included an automated GitHub Actions workflow (see `.github/workflows/update-guild-data.yml.disabled`) to periodically use a JS script (see `scripts/update-guild-data.js.disabled`) to fetch guild player data directly from the SWGOH.GG API and generate the JSON data files used by the site.

However, SWGOH.GG currently blocks requests coming from GitHub Actions runners with HTTP 403 responses, even though the same requests work correctly from a regular browser session.

Because of this limitation:

* The GitHub Actions workflow has been intentionally disabled.
* The JS update script is currently kept for reference purposes only.
* Guild data is currently generated manually through the browser-based `superofi/swgoh.html` tool which reads the list of ally codes of guild members from `data/guild/guild-members.csv`.

## 🔗 Enlaces

- **Sitio Web**: https://maathjtmfaselli.github.io
- **Últimas novedades**: https://maathjtmfaselli.github.io/holocrones.html?open=holocron__changelog
- **GitHub**: [@maathjtmfaselli](https://github.com/maathjtmfaselli)
- **Star Wars: Galaxy of Heroes**: [swgoh.gg](https://swgoh.gg)
