# ADR-0006 — Architecture - Holocron module as reusable Web Component

## Status
Accepted

---

# Context

La aplicación requiere reutilizar funcionalidad entre múltiples páginas dentro de una arquitectura frontend-first sin backend propio.

El proyecto busca:
- minimizar dependencias externas
- mantener compatibilidad total con GitHub Pages
- utilizar tecnologías web estándar
- permitir evolución incremental de la arquitectura

Inicialmente se evaluó una aproximación basada en:
- fragmentos HTML
- carga dinámica manual
- scripts inline
- inicialización imperativa

Sin embargo, esta aproximación generó problemas de:
- colisiones globales
- redeclaración de símbolos
- gestión manual de lifecycle
- acoplamiento entre páginas y componentes
- complejidad creciente del loader
- difícil escalabilidad
- encapsulación limitada

La evolución natural del proyecto llevó a adoptar el modelo de **Web Components nativos** como mecanismo de componentización.

---

# Decision

La funcionalidad se implementará mediante componentes reutilizables llamados **holocrones**.

Cada holocrón será un **Web Component nativo** basado en:
- Custom Elements
- Shadow DOM
- ES Modules

Los holocrones se organizarán como módulos autocontenidos independientes.

---

# Definición de Holocrón

Un holocrón es un componente web reutilizable que encapsula:

- estructura HTML
- estilos propios
- lógica JavaScript
- acceso a datasets
- assets asociados
- metadata declarativa
- lifecycle independiente

Cada holocrón debe:
- poder renderizarse mediante una etiqueta HTML propia
- inicializarse automáticamente al insertarse en el DOM
- reutilizarse en distintas páginas
- soportar carga dinámica
- minimizar dependencias externas
- mantener aislamiento funcional y visual

---

# Arquitectura Base

## Estructura estándar

```text
/holocrones/
  nombre-del-holocron/
    component.js
    template.html
    style.css
    manifest.json
```
Web Component

Cada holocrón define un Custom Element:

customElements.define(
"holocron-order66-archive",
Order66Archive
);
Uso Declarativo

Los holocrones se utilizan directamente como etiquetas HTML:

<holocron-order66-archive>
</holocron-order66-archive>
Shadow DOM

Cada holocrón debe utilizar Shadow DOM para:

encapsular estilos
evitar colisiones CSS
aislar estructura interna

Ejemplo:

this.attachShadow({
mode: "open"
});
Lifecycle

Los holocrones utilizan lifecycle nativo del navegador:

Callback	Responsabilidad
connectedCallback()	inicialización
disconnectedCallback()	limpieza
attributeChangedCallback()	reacción a cambios
adoptedCallback()	migración de documento
Casos de Uso
1. Composición de páginas

Los holocrones permiten construir páginas mediante composición declarativa:

<holocron-guild-rules>
</holocron-guild-rules>

<holocron-guild-goals>
</holocron-guild-goals>

<holocron-order66-archive>
</holocron-order66-archive>

Las páginas actúan únicamente como contenedores compositivos.

2. Biblioteca de holocrones

La aplicación incluye una página de biblioteca:

/holocrones.html

La biblioteca permite:

visualizar catálogo
filtrar holocrones
cargar dinámicamente un holocrón en un visor
documentar funcionalidades
facilitar testing individual

El visor renderiza dinámicamente el Web Component seleccionado.

3. Apertura directa mediante URL

Los holocrones pueden abrirse directamente mediante parámetros URL:

/holocrones.html?open=holocron__changelog

Esto permite:

deep linking
compartición directa
navegación persistente
acceso rápido desde documentación o notificaciones

La biblioteca debe resolver automáticamente el parámetro open y renderizar el holocrón correspondiente.

Manifest

Cada holocrón incluye un archivo declarativo:

manifest.json

Ejemplo:

{
"id": "order66-archive",
"tag": "holocron-order66-archive",
"title": "Histórico Orden66",
"category": "guild",
"tags": [
"history",
"stats"
],
"requiredData": [
"guild.order66"
]
}
Responsabilidades
component.js

Contiene:

definición del Custom Element
lifecycle
renderizado
listeners
carga de datos
lógica del componente
template.html

Contiene:

estructura HTML
placeholders declarativos
style.css

Contiene:

estilos encapsulados del componente
manifest.json

Contiene:

metadata
tags
categoría
datasets requeridos
información de catálogo
Datos

Los holocrones consumen datos exclusivamente desde:

/data/

No deben:

depender de backend
realizar mutaciones persistentes
depender de APIs privadas
Consequences
Positivas
✅ componentización nativa estándar
✅ eliminación de loaders complejos
✅ lifecycle proporcionado por navegador
✅ encapsulación real mediante Shadow DOM
✅ reutilización elevada
✅ composición declarativa
✅ lazy loading natural mediante ES Modules
✅ aislamiento CSS
✅ compatibilidad github.io
✅ reducción de código boilerplate
✅ arquitectura altamente modular
✅ estructura AI-friendly
✅ facilidad de testing individual
✅ deep linking de holocrones
Negativas
❌ mayor curva conceptual
❌ reactividad manual
❌ necesidad de comprender Shadow DOM
❌ tooling menos maduro que frameworks grandes
❌ SSR limitado
❌ debugging ligeramente más complejo
Rejected Alternatives
HTML Fragments + Manual Loader

Arquitectura basada en:

fetch HTML
innerHTML
init manual

Rechazada por:

complejidad creciente
lifecycle manual
colisiones globales
acoplamiento elevado
Framework SPA Completo

Opciones evaluadas:

React
Angular
Vue

Rechazadas inicialmente por:

complejidad innecesaria
tooling excesivo
aumento de bundle
alejamiento de filosofía web nativa
