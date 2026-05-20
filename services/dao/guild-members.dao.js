import { loadCsv } from "../csv.service.js";

export class GuildMembersDao {

  constructor() {
    this._cache = null;
    this._promise = null;
  }

  async loadGuildMembers() {
    if (this._cache) {
      return this._cache;
    }
    if (this._promise) {
      return this._promise;
    }

    this._promise = loadCsv("/data/guild/guild-members.csv")
      .then(data => {
        this._cache = data;
        this._promise = null;
        return data;
      });

    return this._promise;
  }

}
