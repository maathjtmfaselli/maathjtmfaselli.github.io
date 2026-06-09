import { BaseDao } from "./base.dao.js";
import { loadCsv } from "../csv.service.js";

export class MasterRoteOpsDao extends BaseDao {
  constructor() {
    super(
      "/data/master/rote-ops.csv",
      (url) => loadCsv(url)
    );
  }

  async loadPnjsByOps() {
    return this.loadData();
  }
}
