# 📄 ADR-0006: Acceso a Datos vía DAO con Cache en Memoria

## Estado
Aceptado

## Contexto
El sistema carga los datos raw desde la capa `data`.
* Carga redundante innecesaria
* Inconsistencia potencial si diferentes consumidores procesan versiones distintas
* Latencia innecesaria en el arranque del frontend

## Decisión
- El acceso a los datos se realizará a través de un DAO (Data Access Object).
- Se implementará un **cache en memoria a nivel de servicio singleton**.

```
┌───────────────────────────────────────────────┐
│               Flujo de Datos                  │
├───────────────────────────────────────────────┤
│                                               │
│  Holocrones → Services → DAO → Cache → Data   │
│                                               │
└───────────────────────────────────────────────┘
```

## Implementación propuesta

```js
class RoteHistoricalService {
  constructor() {
    this._cache = null;
    this._loadingPromise = null;
  }

  async loadHistoricalData() {
    // 1. Si ya está en cache, devolverlo
    if (this._cache) return this._cache;

    // 2. Si ya hay una carga en curso, reutilizarla
    if (this._loadingPromise) return this._loadingPromise;

    // 3. Primera carga
    this._loadingPromise = fetch("../data/guild/rote-historical.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then(data => {
        this._cache = data;
        this._loadingPromise = null;
        return data;
      })
      .catch(err => {
        this._loadingPromise = null;
        throw err;
      });

    return this._loadingPromise;
  }

  clearCache() {
    this._cache = null;
    this._loadingPromise = null;
  }
}
```

## Consecuencias

### Positivas
* Solo una carga real de los datos raw por sesión
* Evita múltiples requests redundantes
* Mejora rendimiento inicial
* Permite reutilización consistente entre servicios

### Negativas
* Los datos no se actualizan automáticamente si cambia el fichero (salvo `clearCache()`)
* Se introduce estado en el servicio (menos funcional, más singleton)

## Alternativas consideradas
* Cargar datos en cada componente → descartado por duplicación
* Centralizar en un store global → overkill para el tamaño del proyecto actual
* Service Worker cache → innecesario para un JSON local

## Resultado
El sistema de servicios pasa a depender de una única fuente de verdad en memoria durante el ciclo de vida de la app.
