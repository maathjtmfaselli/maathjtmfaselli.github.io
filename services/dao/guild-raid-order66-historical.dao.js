import { BaseDao } from "./base.dao.js";
import { loadCsv } from "../csv.service.js";

export class GuildOrder66HistoricalDao extends BaseDao {
  constructor() {
    super(
      "/data/guild/guild-raid-order66-historical.csv",
      (url) => loadCsv(url)
    );
  }

  async loadHistoricalData() {
    return this.loadData();
  }
}
