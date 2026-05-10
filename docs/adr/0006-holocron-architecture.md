# ADR-0006 — Holocron Component Architecture

## Status
Accepted

## Context
La aplicación requiere reutilizar funcionalidad entre múltiples páginas. Sin frameworks de componentización, necesitamos un patrón arquitectónico que permita:
- Reutilizar código y lógica
- Desacoplar componentes
- Mantener independencia entre módulos
- Facilitar pruebas

## Decision
La funcionalidad se implementará mediante componentes llamados **holocrones**. Cada holocrón es:

### Definición de Holocrón
```
Un componente autocontenido que encapsula:
- HTML (estructura)
- CSS (estilos propios y aislados)
- JavaScript (lógica interactiva)
- Acceso a datos (lectura de `/data/`)
```

## Structure

### Archivo Único Holocrón
```html
<!-- holocrons/mi-holocron.html -->
<template id="mi-holocron-template">
  <div class="holocron mi-holocron">
    <!-- HTML estructura -->
    <style>
      /* Estilos aislados al holocrón */
      .holocron.mi-holocron { }
    </style>
    <script>
      // Lógica del holocrón
      class MiHolocrón {
        constructor(element) { }
        async init() { }
        render() { }
      }
    </script>
  </div>
</template>
```

## Consequencess

### Positivas
- ✅ Reutilización elevada de código
- ✅ Desacoplamiento funcional entre componentes
- ✅ Composición dinámica de páginas
- ✅ Facilita mantenimiento
- ✅ Permite incrustación (embeddable)
- ✅ Aislamiento de estilos

### Negativas
- ❌ Gestión manual de ciclo de vida
- ❌ Necesidad de convenciones claras
- ❌ Boilerplate repetitivo
- ❌ Sin reactividad automática

## Patterns

### Encapsulación de Estilos
Los estilos deben ser específicos al holocrón usando clases prefijadas:
```css
.holocron.mi-holocron { /* raíz */ }
.holocron.mi-holocron .elemento { /* hijo */ }
```

### Comunicación
- Datos: Lectura de `/data/` mediante Fetch API
- Estado: Gestión local con variables privadas
- Eventos: EventEmitter pattern para comunicación con página host

### Renderizado Dinámico
```javascript
async render() {
  const data = await fetch('/data/guild/members.json');
  const json = await data.json();
  // Actualizar DOM basado en datos
}
```

## Biblioteca de Holocrones

Una página (`holocron-library.html`) centraliza todos los holocrones disponibles:
- Catálogo visible
- Documentación de uso
- Capacidad de prueba individual
- Ejemplos de incrustación

## Casos de Uso

### Consultable Individualmente
```
/holocron-library.html?open=holocron__changelog
```

### Incrustable en Otras Páginas
```html
<div class="holocron-container">
  <template id="holocron-template">
    <!-- contenido del holocrón -->
  </template>
  <script src="/js/holocron.js"></script>
</div>
```

## Naming Convention

- Archivo: `/holocrons/nombre-del-holocron.html` (kebab-case)
- Template ID: `nombre-del-holocron-template`
- Class: `HolocrónNombre` (PascalCase)

## Related ADRs
- [ADR-0002: Vanilla Web Stack](/docs/adr/0002-vanilla-web-stack.md) - Tecnologías base
- [ADR-0003: No Framework Policy](/docs/adr/0003-no-framework-policy.md) - Alternativa a frameworks
