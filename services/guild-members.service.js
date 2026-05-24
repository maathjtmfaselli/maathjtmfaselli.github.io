import { RegistryDao } from "./dao/registry.dao.js";

export class GuildMembersService {
  constructor() {
    this.guildMembersDao = RegistryDao.getMembers();
    this.guildMembersProcessedDataDao = RegistryDao.getMembersProcessed();
  }

  async loadMembers() {
    return this.guildMembersDao.loadMembers();
  }
}
