import { GuildMembersService } from "./guild-members.service.js";
import { GuildMembersRawDataDao } from "./dao/guild-members-raw-data.dao.js";
import { GuildMembersProcessedDataDao } from "./dao/guild-members-processed-data.dao.js";

export class SwgohService {

  constructor() {
    this.membersService = new GuildMembersService();
    this.guildMembersRawDataDao = new GuildMembersRawDataDao();
    this.guildMembersProcessedDataDao = new GuildMembersProcessedDataDao();
  }

  async fetchGuildRawData() {
    const guildMembers = await this.membersService.loadMembers();
    const rawPlayers = [];
    for (const member of guildMembers) {
      try {
        const memberData = await this.fetchPlayer(member.allyCode);
        rawPlayers.push({
          name: member.name,
          allyCode: member.allyCode,
          units: this.extractUnits(memberData)
        });
      } catch (error) {
        console.log(`${member.name} failed: ${error.message}`);
      }
    }

    const rawOutput = {
      updated: new Date().toISOString(),
      members: rawPlayers
    };

//    await guildMembersRawDataDao.saveFile();

    return rawOutput;
  }

  async fetchPlayer(allyCode) {
    const response = await fetch(`https://swgoh.gg/api/player/${allyCode}/`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  }

  extractUnits(memberData) {
    const units = {};

    for (const unit of memberData.units) {
      units[unit.data.name] = Math.max(0, unit.data.relic_tier - 2);
    }

    return units;
  }

  async processGuildRawData() {
    const rawData = await this.guildMembersRawDataDao.loadGuildMembersRawData();
    const processedPlayers = rawData.members.map(this.processPlayer);
    const processedGuild = this.aggregateGuildStats(processedPlayers, rawData);

    const processedOutput = {
      updated: new Date().toISOString(),
      ...processedGuild,
      members: processedPlayers
    };

    return processedOutput;
  }

  processPlayer(rawPlayer) {
    const units = rawPlayer.units;
    return {
      name: rawPlayer.name,
      allyCode: rawPlayer.allyCode,
      canDoCorellia: (units["Qi'ra"] || 0) >= 5 && (units["Young Han Solo"] || 0) >= 5,
      canDoBracca: ((units["Cere Junda"] || 0) >= 7 && (units["Jedi Knight Cal Kestis"] || 0) >= 7)
          || ((units["Cere Junda"] || 0) >= 7 && (units["Cal Kestis"] || 0) >= 7),
      canDoDathomir: (units["Merrin"] || 0) >= 7,
      canDoKashyyyk: (units["Saw Gerrera"] || 0) >= 7,
      canDoTatooine: (units["Bo-Katan (Mand'alor)"] || 0) >= 7,
      canDoReva: (units["Grand Inquisitor"] || 0) >= 7,
      canDoHaven: (units["Third Sister"] || 0) >= 8,
      canDoKessel: (units["Qi'ra"] || 0) >= 8 && (units["L3-37"] || 0) >= 8
    };
  }
  aggregateGuildStats(members, rawData) {
    const stats = {
      totalMembers: members.length,
      members: members,
      rote: {
        specialMissions: {
          canDoCorellia: 0,
          canDoBracca: 0,
          canDoDathomir: 0,
          canDoReva: 0,
          canDoMandalor: 0,
          canDoKashyyyk: 0,
          canDoZeffo: 0,
          canDoTatooine: 0,
          canDoHaven: 0,
          canDoKessel: 0
        },
        characterCounts: {}
      }
    };

    members.forEach(member => {
      if (member.canDoCorellia) stats.rote.specialMissions.canDoCorellia++;
      if (member.canDoBracca) stats.rote.specialMissions.canDoBracca++;
      if (member.canDoDathomir) stats.rote.specialMissions.canDoDathomir++;
      if (member.canDoReva) stats.rote.specialMissions.canDoReva++;
      if (member.canDoMandalor) stats.rote.specialMissions.canDoMandalor++;
      if (member.canDoKashyyyk) stats.rote.specialMissions.canDoKashyyyk++;
      if (member.canDoZeffo) stats.rote.specialMissions.canDoZeffo++;
      if (member.canDoTatooine) stats.rote.specialMissions.canDoTatooine++;
      if (member.canDoHaven) stats.rote.specialMissions.canDoHaven++;
      if (member.canDoKessel) stats.rote.specialMissions.canDoKessel++;
    });

    rawData.members.forEach(member => {
      Object.entries(member.units).forEach(([unitName, relic]) => {
            if (!stats.rote.characterCounts[unitName]) {
              stats.rote.characterCounts[unitName] = {
                r5plus: 0,
                r6plus: 0,
                r7plus: 0,
                r8plus: 0
    //              r9plus: 0
              };
            }
            if (relic >= 5) {
              stats.rote.characterCounts[unitName].r5plus++;
            }
            if (relic >= 6) {
              stats.rote.characterCounts[unitName].r6plus++;
            }
            if (relic >= 7) {
              stats.rote.characterCounts[unitName].r7plus++;
            }
            if (relic >= 8) {
              stats.rote.characterCounts[unitName].r8plus++;
            }
    //          if (relic >= 9) {
    //            stats.rote.characterCounts[unitName].r9plus++;
    //          }
          });
    });

    return stats;
  }

}
