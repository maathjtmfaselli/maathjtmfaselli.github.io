# Cómo contribuir

> No hace falta saber programar para colaborar en esta web.

El objetivo de esta web es ofrecer herramientas e información útil para los miembros del gremio de Spain Space del juego SWGOH.

## Formas de colaborar

- [Actualizar Datos del Gremio](#actualizar-datos-del-gremio)
- Reportar bugs o problemas
- Sugerir (o implementar) nuevos holocrones
- Sugerir (o implementar) nuevas funcionalidades

## Actualizar Datos del Gremio

- Al actualizar los datos del gremio, la web se actualiza automáticamente.
- Los datos del gremio se encuentran en la carpeta `/data/guild/`.

### Información de miembros activos
- Dónde?
  - `/data/guild/guild-members.csv`
- Cuándo actualizarlo?
  - Altas en el gremio
  - Bajas en el gremio
  - Aunque no haya habido cambios de jugadores en el gremio, antes de cada Alzamiento para recalcular los ops completables.
- Los datos de la web NO se actualizan automáticamente, requiere intervención manual.
  - En el navegador, abre la página web `superofi/swgoh.html`
  - Lanza el proceso `Fetch Guild Raw Data`. Leerá el archivo `/data/guild/guild-members.csv`, descargará desde swgoh.gg la informaicón en bruto de todos los miembros del guild.
  - Reemplaza el fichero `/data/generated/guild-members-raw-data.json` con el fichero que ha generado el proceso anterior.
  - Lanza el proceso `Process Guild Raw Data`. Leerá el archivo `/data/generated/guild-members-raw-data.json`, para calcular datos que se utilizarán en otros lugares de la web, como información sobre los pnjs y reliquias...
  - Reemplaza el fichero `/data/generated/guild-members-processed-data.json` con el fichero que ha generado el proceso anterior.

### Puntuación del gremio en Raid
- Dónde?
  - Droid Destruction (`/data/guild/guild-raid-dd-historical.csv`)
  - Orden66 (`/data/_archive/guild-raid-order66-historical.csv`)
  - Naboo (`/data/_archive/guild-raid-naboo-historical.csv`)
- Cuándo actualizarlo?
  - Nuevo intento de Raid se ha terminado

### Alzamiento
- Dónde 
  - `guild-rote-historical.json`
- Cuándo actualizarlo?
  - Cuando termina una edición de Alzamiento

## Proceso de Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nombre`)
3. Realiza tus cambios
4. Haz commit (`git commit -m 'Descripción del cambio'`)
5. Push a tu rama (`git push origin feature/nombre`)
6. Abre un Pull Request

---

¡Gracias por contribuir y ayudar a que el gremio siga creciendo!

---

## (LEGACY) Automatic Guild Data update workflow

This project originally included an automated GitHub Actions workflow (see `.github/workflows/update-guild-data.yml.disabled`) to periodically use a JS script (see `scripts/update-guild-data.js.disabled`) to fetch guild player data directly from the SWGOH.GG API and generate the JSON data files used by the site.

However, SWGOH.GG currently blocks requests coming from GitHub Actions runners with HTTP 403 responses, even though the same requests work correctly from a regular browser session.

Because of this limitation:

* The GitHub Actions workflow has been intentionally disabled.
* The JS update script is currently kept for reference purposes only.
* Guild data is currently generated manually through the browser-based `superofi/swgoh.html` tool which reads the list of ally codes of guild members from `data/guild/guild-members.csv`.
