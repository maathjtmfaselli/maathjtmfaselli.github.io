import { RegistryDao } from "./dao/registry.dao.js";

const GUILD_RANK_THRESHOLDS = Object.freeze({
  GRAND_MASTER: 7200,
  KNIGHT: 3000
});

export class DroidDestructionService {

  constructor() {
    this.guildDroidDestructionHistoricalDao = RegistryDao.getDroidDestruction();
  }

  loadHistoricalData() {
    return this.guildDroidDestructionHistoricalDao.loadHistoricalData();
  }

  getDateColumns(rows) {
    return Object.keys(rows[0])
      .filter(k => k !== "Jugador");
  }

  getMaxScoreByMemberName(memberName) {
    if (!memberName || !Object.entries(memberName)) {
      return 0;
    }
    return Math.max(
      ...Object.entries(memberName)
          .filter(([key]) => key !== "Jugador")
          .map(([, value]) => Number(value) || 0));
  }

  getGuildTheoreticalMaxScore(rows) {
    if (!rows || rows.length === 0) return 0;
    const dates = this.getDateColumns(rows);

    // 1. calcular máximo individual de cada jugador
    const playerMaxes = rows.map(player => this.getMaxScoreByMemberName(player));

    // 2. suma total del mejor caso
    const totalMax = playerMaxes.reduce(
      (sum, max) => sum + max,
      0
    );

    return totalMax;
  }

  getRankThresholds() {
    return {
      grandMaster: GUILD_RANK_THRESHOLDS.GRAND_MASTER,
      knight: GUILD_RANK_THRESHOLDS.KNIGHT,
      padawan: 0
    };
  }

  getPlayerRank(player) {
    const maxScore = this.getMaxScoreByMemberName(player);
    if (maxScore >= GUILD_RANK_THRESHOLDS.GRAND_MASTER) {
      return "grand-master";
    } else if (maxScore >= GUILD_RANK_THRESHOLDS.KNIGHT) {
      return "knight";
    } else {
      return "padawan";
    }
  }

  getRankCounts(guild) {
     const counts = {
       grandMaster: 0,
       knight: 0,
       padawan: 0
     };

     guild.forEach(player => {
       const rank = this.getPlayerRank(player);

       if (rank === "grand-master") {
         counts.grandMaster++;
       } else if (rank === "knight") {
         counts.knight++;
       } else {
         counts.padawan++;
       }
     });

     return counts;
   }

}
