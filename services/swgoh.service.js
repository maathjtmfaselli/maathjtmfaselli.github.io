import { GuildMembersService } from "./guild-members.service.js";

export class SwgohService {

  constructor() {
    this.membersService = new GuildMembersService();
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
}

export function aggregateGuildStats(members) {
  const stats = {
    countCanDoCorellia: 0,
    countCanDoBracca: 0,
    countCanDoDathomir: 0,
    countCanDoReva: 0,
    countCanDoMandalor: 0,
    countCanDoKashyyyk: 0,
    countCanDoZeffo: 0,
    countCanDoTatooine: 0,
    countCanDoHaven: 0,
    countCanDoKessel: 0,
    totalMembers: members.length,
    members: members
  };

  members.forEach(member => {
    if (member.canDoCorellia) stats.countCanDoCorellia++;
    if (member.canDoBracca) stats.countCanDoBracca++;
    if (member.canDoDathomir) stats.countCanDoDathomir++;
    if (member.canDoReva) stats.countCanDoReva++;
    if (member.canDoMandalor) stats.countCanDoMandalor++;
    if (member.canDoKashyyyk) stats.countCanDoKashyyyk++;
    if (member.canDoZeffo) stats.countCanDoZeffo++;
    if (member.canDoTatooine) stats.countCanDoTatooine++;
    if (member.canDoHaven) stats.countCanDoHaven++;
    if (member.canDoKessel) stats.countCanDoKessel++;
  });

  return stats;
}

export function processPlayer(rawPlayer) {
  const units = rawPlayer.units;
  return {
    name: rawPlayer.name,
    allyCode: rawPlayer.allyCode,
    canDoCorellia: (units["Qi'ra"] || 0) >= 5 && (units["Young Han Solo"] || 0) >= 5,
    canDoBracca: (units["Cere Junda"] || 0) >= 7 && (units["Jedi Knight Cal Kestis"] || 0) >= 7,
    canDoDathomir: (units["Merrin"] || 0) >= 7,
    canDoKashyyyk: (units["Saw Gerrera"] || 0) >= 7,
    canDoTatooine: (units["Bo-Katan (Mand'alor)"] || 0) >= 7,
    canDoReva: (units["Grand Inquisitor"] || 0) >= 7,
    canDoHaven: (units["Third Sister"] || 0) >= 8,
    canDoKessel: (units["Qi'ra"] || 0) >= 8 && (units["L3-37"] || 0) >= 8
  };
}
