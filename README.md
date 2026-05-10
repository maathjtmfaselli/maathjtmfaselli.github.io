# Spain Space - Gremio en Star Wars Galaxy of Heroes

¡Bienvenido al repositorio oficial del sitio web de la **Spain Space** Guild en Star Wars: Galaxy of Heroes!

## 🛠️ Stack Tecnológico

Mantenemos este proyecto lo más **nativo posible**, utilizando solo tecnologías web fundamentales:

- **HTML** (79.8%) - Marcado semántico y estructura de páginas
- **JavaScript** (13%) - Funcionalidades interactivas sin dependencias externas
- **CSS** (7.2%) - Estilos y diseño responsive

**Sin frameworks ni librerías externas** - Todo código vanilla para máximo rendimiento y mantenibilidad.

### ✨ Características

- Diseño responsive para todos los dispositivos
- Carga rápida sin dependencias externas
- Estructura de código limpia y mantenible
- Holocrones autocontenidos e incrustables
- Separación clara entre datos maestros y datos dinámicos

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

### Actualizar Datos del Gremio

Los datos se encuentran en la carpeta `/data/`. Puedes:

1. **Actualizar archivos JSON** - Modifica los archivos existentes con nueva información
2. **Verificar la integridad** - Asegúrate de que los JSON sean válidos

### Otras Contribuciones

- Reportar bugs o problemas
- Sugerir nuevos holocrones
- Sugerir nuevas funcionalidades
- Mejorar el diseño y la experiencia de usuario
- Optimizar el código HTML, CSS o JavaScript

### Proceso de Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nombre`)
3. Realiza tus cambios
4. Haz commit (`git commit -m 'Descripción del cambio'`)
5. Push a tu rama (`git push origin feature/nombre`)
6. Abre un Pull Request

## 🔗 Enlaces

- **Sitio Web**: https://maathjtmfaselli.github.io
- **Últimas novedades**: https://maathjtmfaselli.github.io/holocrones.html?open=holocron__changelog
- **GitHub**: [@maathjtmfaselli](https://github.com/maathjtmfaselli)
- **Star Wars: Galaxy of Heroes**: [swgoh.gg](https://swgoh.gg)

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
