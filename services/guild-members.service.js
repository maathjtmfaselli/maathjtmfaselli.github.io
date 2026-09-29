import { RegistryDao } from "./dao/registry.dao.js";

export class GuildMembersService {
  constructor() {
    this.guildMembersDao = RegistryDao.getMembers();
    this.getMembersRawDataDao = RegistryDao.getMembersRaw();
    this.guildMembersProcessedDataDao = RegistryDao.getMembersProcessed();
  }

  async loadMembers() {
    return this.guildMembersDao.loadMembers();
  }
  async loadMembersRoster() {
    return this.getMembersRawDataDao.loadGuildMembersRawData();
  }
}
