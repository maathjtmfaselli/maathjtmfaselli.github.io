import { loadCsv } from "./csv.service.js";

export class Order66Service {

  constructor() {
    this._cache = null;
    this._promise = null;
  }

  async loadHistoricalData() {
    if (this._cache) {
      return this._cache;
    }
    if (this._promise) {
      return this._promise;
    }

    this._promise = loadCsv("/data/guild/guild-raid-order66-historical.csv")
      .then(data => {
        this._cache = data;
        this._promise = null;
        return data;
      });

    return this._promise;
  }

  getDateColumns(rows) {
    return Object.keys(rows[0])
      .filter(k => k !== "Jugador");
  }

  getMemberMaxScore(playerName) {
    if (!playerName || !Object.entries(playerName)) {
      return 0;
    }
    const values = Object.entries(playerName)
        .filter(([key]) =>
          key !== "Jugador"
        )
        .map(([, value]) =>
          Number(value) || 0
        );

    return Math.max(...values);
  }

//  getMemberMaxScore(playerName) {
//    return Math.max(
//      ...Object.entries(playerName)
//        .filter(([k]) => k !== "Jugador")
//        .map(([, v]) => Number(v) || 0)
//    );
//  }

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
      this.getMemberMaxScore(player)
    );

    // 2. suma total del mejor caso
    const totalMax = playerMaxes.reduce(
      (sum, max) => sum + max,
      0
    );

    return totalMax;
  }

  getPlayerRank(player) {
    const maxScore = this.getMemberMaxScore(player);
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
