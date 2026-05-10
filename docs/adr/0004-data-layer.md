# ADR-0004 — Data layer - Master and Guild Data Separation

## Status
Accepted

## Context
Existen datos estáticos y datos dinámicos con ciclos distintos.

## Decision
Separar:
- datos maestros
- datos variables del gremio

## Consequences
- cache más eficiente
- mantenimiento simplificado
- menor acoplamiento de datasets