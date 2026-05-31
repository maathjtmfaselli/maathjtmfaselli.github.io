# ADR-0004: Holocrones como Web Components Reutilizables

## Estado
Aceptado

## Contexto

La aplicación requiere reutilizar funcionalidad entre múltiples páginas dentro de una arquitectura frontend-first sin backend propio.

El proyecto busca:
- Minimizar dependencias externas
- Mantener compatibilidad total con GitHub Pages
- Utilizar tecnologías web estándar
- Permitir evolución incremental de la arquitectura

## Decisión

La funcionalidad se implementará mediante módulos autocontenidos e independientes que a partir de ahora llamaremos **holocrones**, que en realidad son [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) nativos basados en [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- En caso de necesitar estilos encapsulados propios, es obligatorio utilizar [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).

## Definición de Holocrón

Un holocrón es un componente web reutilizable que encapsula:

```
├── /holocrones/
│   └── categoria-del-holocron/
│       └── id-del-holocron/
│           ├── component.js         # Lógica JavaScript, Acceso a datasets, Lifecycle independiente
│           ├── template.html        # Estructura HTML
│           ├── style.css            # (Opcional) Estilos propios si fueran necesarios
│           └── manifest.json        # Metadata declarativa
└────── holocron-registry.json
```

## Requisitos

Cada holocrón debe:
- [ ] Declararse en el [Catálogo de Holocrones](#catálogo-de-holocrones)
- [ ] Alojare `manifest.json`, `template.html` y `component.js` en `/holocrones/categoría/id`. En caso de necesitar usar estilos CSS propíos, tb su `sytle.css`.
- [ ] Mantener aislamiento funcional y visual
- Renderizarse mediante una etiqueta HTML propia
- Inicializarse automáticamente al insertarse en el DOM
- Reutilizarse en distintas páginas
- Soportar carga dinámica

### Catálogo de Holocrones

El archivo `/holocrones/holocron-registry.json` mantiene el catálogo disponible de holocrones.

Ejemplo:

```json
{
  "holocrons": [
    {
      "path": "holocrones/guild/goals"
    }
  ]
}
```

### Manifest

Cada holocrón incluye un archivo declarativo `manifest.json`.

```json
{
  "category": "guild",
  "id": "goals",
  "title": "¿Cuáles son los Objetivos del Gremio?",
  "description": "Objetivos del gremio"
}
```

### `template.html`

Contiene estructura HTML.

### `component.js`

Contiene:

- definición del Custom Element
- lifecycle
- renderizado
- listeners
- carga de datos
- lógica del componente

Cada holocrón define un Custom Element:

```
customElements.define("holocron-guild-goals", GuildPrioritiesHolocron);
```

### `style.css` (Opcional)

En caso de que el holocron requiera estilos encapsulados propios, se cargarán utilizando Shadow DOM

- encapsular estilos
- evitar colisiones CSS
- aislar estructura interna

## Datos

Los holocrones consumen datos exclusivamente desde `/data/`
- Se accede únicamente desde DAOs (`/services/dao`)
- A través de un servicio JavaScript  (`/services`)
- Los datos son estáticos y no cambian.

Restricciones:

- No dependen de backend
- No realizan mutaciones persistentes
- No dependen de APIs privadas

## Lifecycle

Los holocrones utilizan lifecycle nativo del navegador:

| Callback                     | Responsabilidad        | Obligatorio |
|------------------------------|------------------------|-------------|
| `connectedCallback()`        | Inicialización         | Sí          |
| `disconnectedCallback()`     | Limpieza               | No          |
| `attributeChangedCallback()` | Reacción a cambios     | No          |
| `adoptedCallback()`          | Migración de documento | No          |

## Uso

### 1. Composición de páginas

Los holocrones permiten construir páginas mediante composición declarativa:

```html
  <script type="module" src="services/holocron.service.js"></script>

  <section class="holocron-page">
    <holocron-slot data-holocron="guild/rules"></holocron-slot>
    <holocron-slot data-holocron="guild/goals"></holocron-slot>
    <holocron-slot data-holocron="guild/warnings"></holocron-slot>
  </section>
```

### 2. Biblioteca de holocrones

La aplicación incluye una página de biblioteca en `/holocrones.html` que permite:

- Visualizar catálogo de holocrones
- Filtrar holocrones
- Cargar un holocrón en el visor

### 3. Apertura directa en la Biblioteca mediante URL

Los holocrones pueden abrirse en la biblioteca directamente mediante parámetro en la URL. La biblioteca debe resolver automáticamente el parámetro `open` y renderizar el holocrón correspondiente (`category/id`).

```
/holocrones.html?open=web/changelog
```

## Consecuencias

### Positivas
- ✅ componentización nativa estándar
- ✅ eliminación de loaders complejos
- ✅ lifecycle proporcionado por navegador
- ✅ encapsulación real mediante Shadow DOM
- ✅ reutilización elevada
- ✅ composición declarativa
- ✅ lazy loading natural mediante ES Modules
- ✅ aislamiento CSS
- ✅ compatibilidad github.io
- ✅ reducción de código boilerplate
- ✅ arquitectura altamente modular
- ✅ facilidad de testing individual
- ✅ deep linking de holocrones

### Negativas
- ❌ mayor curva conceptual
- ❌ reactividad manual
- ❌ necesidad de comprender Shadow DOM
- ❌ tooling menos maduro que frameworks grandes
- ❌ SSR limitado
- ❌ debugging ligeramente más complejo

## Rejected Alternatives

### HTML Fragments + Manual Loader

Arquitectura basada en:

- fetch HTML
- innerHTML
- init manual

Rechazada por:

- complejidad creciente
- lifecycle manual
- colisiones globales
- acoplamiento elevado

### Framework SPA Completo

Opciones evaluadas:

- React
- Angular
- Vue

Rechazadas inicialmente por:

- complejidad innecesaria
- tooling excesivo
- aumento de bundle
- alejamiento de filosofía web nativa
