import { BaseDao } from "./base.dao.js";

export class GuildMembersProcessedDataDao extends BaseDao {
  constructor() {
    super(
      "/data/generated/guild-members-processed-data.json",
      (url) => fetch(url).then(res => {
        if (!res.ok) throw new Error(`Failed to load guild members processed data: ${res.status}`);
        return res.json();
      })
    );
  }

  async loadGuildMembersProcessedData() {
    return this.loadData();
  }
}
