export class GuildRoteHistoricalDao {

  constructor() {
    this._cache = null;
    this._promise = null;
  }

  async loadGuildRoteHistoricalData() {
    if (this._cache) {
      return this._cache;
    }
    if (this._promise) {
      return this._promise;
    }

    this._promise = fetch("../data/guild/guild-rote-historical.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load guild historical data");
        }

        return response.json();
      })
      .then(data => {
        this._cache = data;
        this._promise = null;
        return data;
      });

    return this._promise;
  }

}
