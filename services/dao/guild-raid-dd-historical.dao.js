import { BaseDao } from "./base.dao.js";
import { loadCsv } from "../csv.service.js";

export class GuildDroidDestructionHistoricalDao extends BaseDao {
  constructor() {
    super(
      "/data/guild/guild-raid-dd-historical.csv",
      (url) => loadCsv(url)
    );
  }

  async loadHistoricalData() {
    return this.loadData();
  }
}
