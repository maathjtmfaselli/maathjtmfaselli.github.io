# ADR-001: Organización modular de los estilos CSS

## Estado
Aceptado

## Fecha
2026-10-24

## Contexto

A medida que un sitio web evoluciona, sus estilos pueden abarcar distintas responsabilidades, como la estructura general, la presentación de componentes, los elementos de navegación y las adaptaciones a diferentes tamaños de pantalla.

Mantener todos los estilos en un único archivo puede dificultar su localización, comprensión y mantenimiento a medida que aumenta la complejidad del sitio. Asimismo, puede favorecer la duplicación de reglas y dificultar la identificación de las relaciones entre los distintos elementos visuales.

Por ello, se considera necesario establecer una organización que facilite la evolución de los estilos, manteniendo una separación clara de responsabilidades y favoreciendo la reutilización y coherencia visual.

## Decisión

Los estilos CSS se organizarán  en módulos especializados, agrupados según responsabilidades funcionales o ámbitos de presentación claramente definidos.

- [ ] **Modularidad**: Cada archivo deberá agrupar estilos relacionados entre sí, evitando tanto la concentración de responsabilidades heterogéneas como una fragmentación excesiva que complique la navegación por el código.
- [ ] **Punto de entrada único**: centralizar en style.css las importaciones de los módulos, manteniendo un orden de carga explícito y predecible.
- [ ] **Coherencia visual**: Centralizar los valores y patrones visuales compartidos cuando resulte apropiado, favoreciendo su reutilización y la coherencia visual.
- [ ] **Mantenibilidad**: Evitar duplicidades y reglas innecesariamente específicas.
- [ ] **Mantenibilidad**: Mantener una estructura sencilla, coherente y comprensible.
- [ ] Gestionar correctamente la cascada, la especificidad y el orden de carga.
- [ ] Revisar la organización cuando la evolución de la interfaz lo justifique.

Por ejemplo, la paleta de colores podrá centralizarse en un único lugar mediante variables CSS reutilizables, de modo que los cambios en los colores principales puedan realizarse sin necesidad de modificar múltiples declaraciones distribuidas por los diferentes archivos.

## Consecuencias

### Positivas
- Mayor mantenibilidad: facilita localizar y modificar los estilos relacionados con una funcionalidad determinada.
- Separación de responsabilidades: permite identificar con mayor claridad el propósito de cada conjunto de estilos.
- Coherencia visual: favorece la reutilización de valores y patrones compartidos.
- Menor duplicidad: facilita detectar y evitar declaraciones redundantes.
- Mejor escalabilidad: permite incorporar nuevas funcionalidades sin concentrar todos los estilos en un único archivo.
- Mayor facilidad de colaboración: simplifica la comprensión y modificación del código por parte de diferentes desarrolladores.

### Negativas
- Mayor número de archivos: requiere una estructura organizativa coherente y conocida.
- Necesidad de establecer criterios de organización: es necesario definir dónde deben ubicarse los nuevos estilos y cómo gestionar las dependencias entre ellos.
- Gestión de la cascada CSS: la separación de estilos exige prestar atención al orden de carga, la especificidad y las posibles colisiones entre reglas.
- Posible fragmentación excesiva: una división demasiado granular puede dificultar el seguimiento de los estilos relacionados.

### Alternativas consideradas

#### Mantener todos los estilos en un único archivo CSS

Se descarta como criterio general de organización porque, a medida que aumenta la complejidad, puede dificultar la separación de responsabilidades y el mantenimiento.

No obstante, puede seguir siendo una opción válida para sitios muy pequeños o con necesidades de presentación limitadas.

Criterios de aplicación

La organización de los estilos deberá seguir estos principios:

Agrupar reglas relacionadas por responsabilidad funcional o ámbito de presentación.
Mantener centralizados los valores y patrones visuales compartidos cuando proceda.
Evitar duplicidades y reglas innecesariamente específicas.
Mantener una estructura sencilla, coherente y fácil de comprender.
Revisar la organización cuando la evolución del sitio haga que la estructura existente deje de resultar adecuada.

## Resultado esperado

Disponer de una organización de estilos modular, coherente y mantenible, que facilite la evolución del sitio web y permita realizar cambios visuales de forma localizada, predecible y consistente.