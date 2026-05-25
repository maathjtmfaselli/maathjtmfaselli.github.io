# Cómo contribuir

> No hace falta saber programar para colaborar en esta web.

## Actualizar Datos del Gremio

Los datos del gremio se encuentran en la carpeta `/data/guild/`.

### Información de miembros activos
- Dónde?
  - `/data/guild/guild-members.csv`
- Cuándo actualizarlo?
  - Altas en el gremio
  - Bajas en el gremio
- La web NO se actualiza automáticamente, requiere intervención manual.

### Puntuación en Raid
- Dónde?
  - Orden66 (`/data/guild/guild-raid-order66-historical.csv`)
  - Naboo (`/data/guild/guild-raid-naboo-historical.csv`)
- Cuándo actualizarlo?
  - Nuevo intento de Raid se ha terminado
- Al actualizar los datos de la Raid, la web se actualiza automáticamente.

### Alzamiento
- Dónde 
  - `guild-rote-historical.json`
- Cuándo actualizarlo?
  - Cuando termina una edición de Alzamiento
- Al actualizar los datos de la Raid, la web se actualiza automáticamente.

## Otras Contribuciones

- Reportar bugs o problemas
- Sugerir nuevos holocrones
- Sugerir nuevas funcionalidades

## Proceso de Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nombre`)
3. Realiza tus cambios
4. Haz commit (`git commit -m 'Descripción del cambio'`)
5. Push a tu rama (`git push origin feature/nombre`)
6. Abre un Pull Request

## (LEGACY) Guild Data update workflow

This project originally included an automated GitHub Actions workflow (see `.github/workflows/update-guild-data.yml.disabled`) to periodically use a JS script (see `scripts/update-guild-data.js.disabled`) to fetch guild player data directly from the SWGOH.GG API and generate the JSON data files used by the site.

However, SWGOH.GG currently blocks requests coming from GitHub Actions runners with HTTP 403 responses, even though the same requests work correctly from a regular browser session.

Because of this limitation:

* The GitHub Actions workflow has been intentionally disabled.
* The JS update script is currently kept for reference purposes only.
* Guild data is currently generated manually through the browser-based `superofi/swgoh.html` tool which reads the list of ally codes of guild members from `data/guild/guild-members.csv`.
