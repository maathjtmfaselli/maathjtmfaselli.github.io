import { Order66Service } from "./order66.service.js";

export class GuildWarningsService {

  constructor() {
    this.order66Service = new Order66Service();
  }

  async loadProcessedGuildData() {
    const res = await fetch("../data/guild/guild-members-processed-data.json");

    if (!res.ok) {
      throw new Error("Failed to load processed guild data");
    }

    return res.json();
  }

  async getWarnings() {
    const order66HistoricalData = await this.order66Service.loadHistoricalData();
    const processedGuildData = await this.loadProcessedGuildData();

    return processedGuildData.members
      .map(member => {
        const order66MaxScore = this.order66Service.getMaxScoreByMemberName(order66HistoricalData.find( row => row.Jugador === member.name ));
        const warning =
          order66MaxScore < 3000
          && !member.canDoBracca
          && !member.canDoTatooine;

        return {
          name: member.name,
          order66MaxScore: order66MaxScore,
          canDoBracca: member.canDoBracca,
          canDoTatooine: member.canDoTatooine,
          warning: warning
        };
      })
      .filter( p => p.warning )
      .sort((a, b) => a.order66MaxScore - b.order66MaxScore );
  }

}
