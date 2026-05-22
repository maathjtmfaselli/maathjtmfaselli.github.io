import { BaseDao } from "./base.dao.js";
import { loadCsv } from "../csv.service.js";

export class GuildMembersDao extends BaseDao {
  constructor() {
    super(
      "/data/guild/guild-members.csv",
      (url) => loadCsv(url)
    );
  }

  async loadMembers() {
    return this.loadData();
  }
}
