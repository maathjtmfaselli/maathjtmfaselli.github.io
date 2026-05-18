import { loadCsv } from "./csv.service.js";

export class Order66Service {

  async loadHistoricalData() {
    return await loadCsv("/data/guild/order66-historical.csv");
  }

  getDateColumns(rows) {
    return Object.keys(rows[0])
      .filter(k => k !== "Jugador");
  }

  getPlayerMaxScore(player) {
    return Math.max(
      ...Object.entries(player)
        .filter(([k]) => k !== "Jugador")
        .map(([, v]) => Number(v) || 0)
    );
  }

//  getGuildMaxScore(rows) {
//    const dates = this.getDateColumns(rows);
//
//    return Math.max(
//
//      ...dates.map(date => {
//
//        return rows.reduce((sum, player) => {
//
//          return sum + (Number(player[date]) || 0);
//
//        }, 0);
//
//      })
//    );
//  }

  getGuildTheoreticalMaxScore(rows) {
    const dates = this.getDateColumns(rows);

    // 1. calcular máximo individual de cada jugador
    const playerMaxes = rows.map(player =>
      this.getPlayerMaxScore(player)
    );

    // 2. suma total del mejor caso
    const totalMax = playerMaxes.reduce(
      (sum, max) => sum + max,
      0
    );

    return totalMax;
  }

  getPlayerRank(player) {
    const maxScore = this.getPlayerMaxScore(player);
    if (maxScore >= 7200) {
      return "grand-master";
    } else if (maxScore >= 3000) {
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
