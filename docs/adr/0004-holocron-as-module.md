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

La funcionalidad se implementará mediante módulos autocontenidos e independientes que a partir de ahora llamaremos **holocrones**, que en realidad son [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) nativos basados en:
- [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Opcionalmente:
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) en caso de necesitar estilos encapsulados propios.

## Definición de Holocrón

Un holocrón es un componente web reutilizable que encapsula:

- Estructura HTML
- Estilos propios
- Lógica JavaScript
- Acceso a datasets
- Assets asociados
- Metadata declarativa
- Lifecycle independiente

### Requisitos

Cada holocrón debe:
- Renderizarse mediante una etiqueta HTML propia
- Inicializarse automáticamente al insertarse en el DOM
- Reutilizarse en distintas páginas
- Soportar carga dinámica
- Minimizar dependencias externas
- Mantener aislamiento funcional y visual

## Estructura Estándar

```
├── /holocrones/
│   ├── category-del-holocron/
│       ├── id-del-holocron/
│           ├── component.js
│           ├── template.html
│           ├── style.css            # (Opcional)
│           └── manifest.json
└────── holocron-registry.json
```

### Convención de nombres

Todo holocrón debe registrar un Custom Element siguiendo la nomenclatura:

```
holocron-{category}-{id}
```

Ejemplos:

- holocron-guild-goals
- holocron-guild-rules
- holocron-web-changelog

### Registro de Holocrones

El archivo holocron-registry.json mantiene el catálogo disponible de holocrones.

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

### `template.html`

Contiene estructura HTML.

### `style.css` (Opcional)

En caso de que el holocron requiera estilos encapsulados propios, se cargarán utilizando Shadow DOM

- encapsular estilos
- evitar colisiones CSS
- aislar estructura interna

## Datos

Los holocrones consumen datos exclusivamente desde `/data/`
- Se accede únicamente desde DAOs (`/services/dao`)
- A través de un servicio JavaScript  (`/services`)

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

Los holocrones se pueden utilizar directamente como etiquetas HTML:

```
<holocron-slot data-holocron="guild/rules"></holocron-slot>
```

Los holocrones permiten construir páginas mediante composición declarativa:

```html
  <section class="holocron-page">
    <holocron-slot data-holocron="guild/rules"></holocron-slot>
    <holocron-slot data-holocron="guild/goals"></holocron-slot>
    <holocron-slot data-holocron="guild/warnings"></holocron-slot>
  </section>
```

Las páginas actúan únicamente como contenedores compositivos.

### 2. Biblioteca de holocrones

La aplicación incluye una página de biblioteca en /holocrones.html que permite:

- Visualizar catálogo
- Filtrar holocrones
- Cargar dinámicamente un holocrón en un visor
- Documentar funcionalidades
- Facilitar testing individual

### 3. Apertura directa mediante URL

Los holocrones pueden abrirse en la biblioteca directamente mediante parámetro en la URL. La biblioteca debe resolver automáticamente el parámetro `open` y renderizar el holocrón correspondiente (`category/id`).

```
/holocrones.html?open=web/changelog
```

Esto permite:

- Deep linking
- Compartición directa
- Navegación persistente
- Acceso rápido desde documentación o notificaciones

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
- ✅ estructura AI-friendly
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
