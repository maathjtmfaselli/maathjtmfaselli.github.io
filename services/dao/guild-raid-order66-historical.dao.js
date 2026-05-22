import { loadCsv } from "../csv.service.js";

export class GuildOrder66HistoricalDao {

  constructor() {
    this._cache = null;
    this._promise = null;
  }

  async loadHistoricalData() {
    if (this._cache) {
      return this._cache;
    }
    if (this._promise) {
      return this._promise;
    }

    this._promise = loadCsv("/data/guild/guild-raid-order66-historical.csv")
      .then(data => {
        this._cache = data;
        this._promise = null;
        return data;
      });

    return this._promise;
  }
}
