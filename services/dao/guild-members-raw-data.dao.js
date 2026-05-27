import { BaseDao } from "./base.dao.js";
//import { FileService } from "../file.service.js";

export class GuildMembersRawDataDao extends BaseDao {
  constructor() {
    super(
      "/data/generated/guild-members-raw-data.json",
      (url) => fetch(url).then(res => {
        if (!res.ok) throw new Error(`Failed to load guild members processed data: ${res.status}`);
        return res.json();
      })
    );
//    this.fileService = new FileService();
  }

  async loadGuildMembersRawData() {
    return this.loadData();
  }

//  async saveFile() {
//    await this.fileService.saveJson("/data/generated/guild-members-raw-data.json", rawOutput);
//  }

}
