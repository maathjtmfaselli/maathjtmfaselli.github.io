import { BaseDao } from "./base.dao.js";

export class GuildRoteHistoricalDao extends BaseDao {
  constructor() {
    super(
      "/data/guild/guild-rote-historical.json",
      (url) => fetch(url).then(res => {
        if (!res.ok) throw new Error(`Failed to load ROTE data: ${res.status}`);
        return res.json();
      })
    );
  }

  async loadGuildRoteHistoricalData() {
    return this.loadData();
  }
}
