import { RegistryDao } from "./dao/registry.dao.js";

export class GuildMembersService {
  constructor() {
    this.guildMembersProcessedDataDao = RegistryDao.getMembersProcessed();
  }
}
