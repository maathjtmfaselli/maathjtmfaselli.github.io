# Spain Space - Gremio en Star Wars Galaxy of Heroes

¡Bienvenido al repositorio oficial del sitio web de la **Spain Space** Guild en Star Wars: Galaxy of Heroes!

## ✨ Principios del proyecto

Este proyecto [sigue una filosofía](/docs/adr/) **frontend-first** e **ia-first**. Está diseñado para funcionar completamente sobre **GitHub Pages**, sin backend propio.

1. **[ADR-0001: Static GitHub Pages Hosting](/docs/adr/0001-static-github-pages.md)** - Arquitectura frontend-only sin infraestructura backend
2. **[ADR-0002: Vanilla Web Stack](/docs/adr/0002-vanilla-web-stack.md)** - Tecnologías web nativas (HTML, CSS, JavaScript)
3. **[ADR-0003: No Framework Policy](/docs/adr/0003-no-framework-policy.md)** - Sin frameworks pesados ni librerías externas
4. **[ADR-0004: Frontend Data Layer](/docs/adr/0004-data-layer-frontendfirst.md)** - Toda la información consumida por la aplicación debe obtenerse desde una capa de datos estática servida por GitHub Pages.
5. **[ADR-0005: Presentation Layer - Responsive Design](/docs/adr/0005-presentation-layer-responsive-design.md)** - Diseño responsive para todos los dispositivos
6. **[ADR-0006: Architecture - Holocron module as reusable Component](/docs/adr/0006-architecture-holocron-as-module.md)** - Componentes autocontenidos reutilizables

## 🛠️ Stack Tecnológico

Utilizamos solo tecnologías web fundamentales, tal como se define en [ADR-0002](/docs/adr/0002-vanilla-web-stack.md):

- **HTML** - Marcado semántico
- **JavaScript** - Lógica interactiva nativa
- **CSS** - Estilos y diseño responsive

## 📁 Estructura del Proyecto

```
├── index.html              # Página principal
├── css/                    # Hojas de estilos
├── js/                     # Scripts de JavaScript
├── data/                   # Datos del gremio y maestros
│   ├── master/             # Datos maestros (estáticos)
│   └── guild/              # Datos del gremio (dinámicos)
├── holocrones/             # Componentes autocontenidos
│   ├── guide-1.html
│   ├── guide-2.html
│   └── ...
├── docs/
│   └── adr/                # Architecture Decision Records
├── images/                 # Recursos gráficos
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

## 🤝 Cómo Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md)

## 📚 Documentación

- **[Architecture Decision Records](/docs/adr/)** - Decisiones arquitectónicas documentadas

## 🔗 Enlaces

- **Sitio Web**: https://maathjtmfaselli.github.io
- **Últimas novedades**: https://maathjtmfaselli.github.io/holocrones.html?open=holocron__changelog
- **GitHub**: [@maathjtmfaselli](https://github.com/maathjtmfaselli)
- **Star Wars: Galaxy of Heroes**: [swgoh.gg](https://swgoh.gg)
