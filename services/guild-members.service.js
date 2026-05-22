import { GuildMembersProcessedDataDao } from "./dao/guild-members-processed-data.dao.js";

export class GuildMembersService {
  constructor() {
    this.guildMembersProcessedDataDao = new GuildMembersProcessedDataDao();
  }
}
