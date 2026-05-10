# Spain Space - Gremio en Star Wars Galaxy of Heroes

¡Bienvenido al repositorio oficial del sitio web de la **Spain Space** Guild en Star Wars: Galaxy of Heroes!

## ✨ Principios del proyecto

Este proyecto sigue una filosofía **frontend-first** y **ia-first**. Está diseñado para funcionar completamente sobre **GitHub Pages**, sin backend propio.

Decisiones de arquitectura

- Proyecto alojado en github, y servido desde github pages.
- Tecnologías web nativas sin frameworks pesados ni librerías externas.
- Estructura de código limpia y mantenible
- Separación clara entre lógica, datos y presentación
  - Presentación - Diseño responsive para todos los dispositivos
  - Lógica - reutilización de componentes autocontenidos (holocrones)
  - Datos - frontend first approach sin backend, los datos se mantienen en la carpeta `data`

## 🛠️ Stack Tecnológico

Mantenemos este proyecto lo más **nativo posible**, utilizando solo tecnologías web fundamentales:

- **HTML**
- **JavaScript**
- **CSS**

## 📁 Estructura del Proyecto

```
├── index.html          # Página principal
├── css/                # Hojas de estilos
├── js/                 # Scripts de JavaScript
├── data/               # Datos del gremio y usuarios
│   ├── master/         # Datos maestros (estáticos)
│   └── guild/          # Datos del gremio (dinámicos)
│   └── ...
├── holocrones/         # Holocrones autocontenidos
│   ├── guide-1.html
│   ├── guide-2.html
│   └── ...
├── images/             # Recursos gráficos
└── README.md           # Este archivo
```
## 🎓 Holocrones

Los **holocrones** son piezas autocontenidas de información que pueden:

- 📚 **Consultarse individualmente** en la biblioteca de holocrones
- 🔗 **Incrustarse en otras páginas** mediante iframes o componentes

Cada holocrón contiene una guía, estrategia o recurso específico para el gremio.

## 📊 Datos

### Master Data (`/data/master/`)

Datos que **no varían** o cambian muy raramente. Estos datos se actualizan ocasionalmente cuando hay cambios importantes en SWGOH.

### Guild Data (`/data/guild/`)

Datos que **varían con el tiempo** y reflejan el estado actual del gremio:
- Información de miembros
- Progreso y estadísticas del gremio
- Objetivos y logros

## 🤝 Cómo Contribuir

Ver CONTRIBUTING.md

## 🔗 Enlaces

- **Sitio Web**: https://maathjtmfaselli.github.io
- **Últimas novedades**: https://maathjtmfaselli.github.io/holocrones.html?open=holocron__changelog
- **GitHub**: [@maathjtmfaselli](https://github.com/maathjtmfaselli)
- **Star Wars: Galaxy of Heroes**: [swgoh.gg](https://swgoh.gg)

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
