export class BaseDao {
  /**
   * @param {string} url - Ruta relativa al archivo de datos
   * @param {Function} loaderFn - Función que realiza el fetch y parseo (ej: fetch().then(r=>r.json()) o loadCsv)
   */
  constructor(url, loaderFn) {
    this.url = url;
    this.loaderFn = loaderFn;
    this._cache = null;
    this._promise = null;
  }

  async loadData() {
    // 1. Si ya está en cache, devolverlo inmediatamente
    if (this._cache) {
      return this._cache;
    }

    // 2. Si ya hay una carga en curso, reutilizar la promesa (evita doble fetch)
    if (this._promise) {
      return this._promise;
    }

    // 3. Iniciar la carga
    this._promise = this.loaderFn(this.url)
      .then(data => {
        this._cache = data;
        this._promise = null; // Limpiar promesa para permitir recargas futuras si se invalida
        return data;
      })
      .catch(error => {
        this._promise = null; // Limpiar promesa en error para permitir reintentos
        throw error;
      });

    return this._promise;
  }

  invalidateCache() {
    this._cache = null;
    this._promise = null;
  }
}