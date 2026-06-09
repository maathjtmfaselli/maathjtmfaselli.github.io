import { GuildMembersDao } from "./guild-members.dao.js";
import { GuildMembersRawDataDao } from "./guild-members-raw-data.dao.js";
import { GuildMembersProcessedDataDao } from "./guild-members-processed-data.dao.js";
import { GuildOrder66HistoricalDao } from "./guild-raid-order66-historical.dao.js";
import { GuildRoteHistoricalDao } from "./guild-rote-historical.dao.js";
import { MasterRoteOpsDao } from "./master-rote-ops.dao.js";

//Singletons - all extend from BaseDao
const daos = {
  members: new GuildMembersDao(),
  membersRaw: new GuildMembersRawDataDao(),
  membersProcessed: new GuildMembersProcessedDataDao(),
  order66: new GuildOrder66HistoricalDao(),
  masterRoteOps: new MasterRoteOpsDao(),
  guildRoteHistorical: new GuildRoteHistoricalDao()
};

export const RegistryDao = {
  getMembers: () => daos.members,
  getMembersRaw: () => daos.membersRaw,
  getMembersProcessed: () => daos.membersProcessed,
  getOrder66: () => daos.order66,
  getMasterRoteOps: () => daos.masterRoteOps,
  getGuildRoteHistorical: () => daos.guildRoteHistorical,

  // Método para limpiar caché global (útil en tests o actualizaciones)
  clearAll: () => {
    Object.values(daos).forEach(dao => dao.invalidateCache?.());
  }
};
