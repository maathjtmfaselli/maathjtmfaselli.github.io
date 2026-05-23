import { GuildMembersDao } from "./guild-members.dao.js";
import { GuildMembersProcessedDataDao } from "./guild-members-processed-data.dao.js";
import { GuildOrder66HistoricalDao } from "./guild-raid-order66-historical.dao.js";
import { GuildRoteHistoricalDao } from "./guild-rote-historical.dao.js";

//Singletons
const daos = {
  members: new GuildMembersDao(),
  membersProcessed: new GuildMembersProcessedDataDao(),
  order66: new GuildOrder66HistoricalDao(),
  rote: new GuildRoteHistoricalDao()
};

export const RegistryDao = {
  getMembers: () => daos.members,
  getMembersProcessed: () => daos.membersProcessed,
  getOrder66: () => daos.order66,
  getRote: () => daos.rote,

  // Método para limpiar caché global (útil en tests o actualizaciones)
  clearAll: () => {
    Object.values(daos).forEach(dao => dao.invalidateCache?.());
  }
};