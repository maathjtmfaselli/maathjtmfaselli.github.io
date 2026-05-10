# Spain Space Guild - SWGOH

¡Bienvenido al repositorio oficial del sitio web de la Spain Space Guild en Star Wars: Galaxy of Heroes!

Este es el sitio web de la **Spain Space Guild**, un gremio dedicado a Star Wars: Galaxy of Heroes. Nuestro objetivo es proporcionar una plataforma información y recursos para los miembros de nuestra comunidad.

## 🛠️ Stack Tecnológico

Mantenemos este proyecto lo más **nativo posible**, utilizando solo tecnologías web fundamentales:

- **HTML** (79.8%) - Marcado semántico y estructura de páginas
- **JavaScript** (13%) - Funcionalidades interactivas sin dependencias externas
- **CSS** (7.2%) - Estilos y diseño responsive

**Sin frameworks ni librerías externas** - Todo código vanilla para máximo rendimiento y mantenibilidad.

## 📁 Estructura del Proyecto

```
├── index.html          # Página principal
├── css/                # Hojas de estilos
├── js/                 # Scripts de JavaScript
├── data/               # Datos del gremio y usuarios
│   ├── members.json
│   ├── stats.json
│   └── ...
├── images/             # Recursos gráficos
└── README.md           # Este archivo
```

## 📊 Carpeta Data

Todos los datos del gremio se encuentran en la carpeta `/data/`. Estos archivos JSON contienen:

- **Información de miembros** - Perfiles y datos de jugadores
- **Estadísticas del gremio** - Progreso y logros colectivos
- **Recursos** - Guías, estrategias y otros contenidos

Los datos se cargan dinámicamente mediante JavaScript vanilla para mantener la página ligera y rápida.

## 🚀 Instalación Local

### Requisitos
- Un navegador web moderno
- (Opcional) Un servidor web local para desarrollo

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/maathjtmfaselli/maathjtmfaselli.github.io.git
cd maathjtmfaselli.github.io
```

2. Inicia un servidor local:
```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js
npx http-server
```

3. Abre tu navegador en `http://localhost:8000`

## ✨ Características

- Diseño responsive para todos los dispositivos
- Carga rápida sin dependencias externas
- Estructura de código limpia y mantenible
- Datos centralizados en formato JSON

## 🤝 Cómo Contribuir

¡Agradecemos las contribuciones a nuestro proyecto! Aquí hay algunas formas de ayudar:

### Actualizar Datos del Gremio

Los datos se encuentran en la carpeta `/data/`. Puedes:

1. **Actualizar archivos JSON** - Modifica los archivos existentes con nueva información
2. **Agregar nuevos datos** - Crea nuevos archivos JSON para nuevas funcionalidades
3. **Verificar la integridad** - Asegúrate de que los JSON sean válidos

Ejemplo de estructura de datos:
```json
{
  "members": [
    {
      "id": 1,
      "name": "Miembro",
      "rank": "Oficial",
      "joinDate": "2024-01-01"
    }
  ]
}
```

### Otras Contribuciones

- Reportar bugs o problemas
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
- **GitHub**: [@maathjtmfaselli](https://github.com/maathjtmfaselli)
- **Star Wars: Galaxy of Heroes**: [swgoh.gg](https://swgoh.gg)

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Última actualización**: Mayo 2026

¡Gracias por visitar el repositorio de Spain Space Guild! May the Force be with you! 🌌
