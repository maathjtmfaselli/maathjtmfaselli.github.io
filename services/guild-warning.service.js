import { Order66Service } from "./order66.service.js";
import { RegistryDao } from "./dao/registry.dao.js";

export class GuildWarningsService {

  constructor() {
    this.order66Service = new Order66Service();
    this.guildMembersProcessedDataDao = RegistryDao.getMembersProcessed();
  }

  async getWarnings() {
    const order66HistoricalData = await this.order66Service.loadHistoricalData();
    const processedGuildData = await this.guildMembersProcessedDataDao.loadGuildMembersProcessedData();

    return processedGuildData.members
      .map(member => {
        const order66MaxScore = this.order66Service.getMaxScoreByMemberName(order66HistoricalData.find( row => row.Jugador === member.name ));
        const countCompletedObjectives = [
          order66MaxScore >= 3000,
          member.canDoBracca,
          member.canDoTatooine
        ].filter(Boolean).length;
        const warning = countCompletedObjectives < 2;

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
//  .sort((a, b) => {
//    if (a.completedObjectives !== b.completedObjectives) {
//      return a.completedObjectives - b.completedObjectives;
//    }
//    return a.order66MaxScore - b.order66MaxScore;
//  });
  }

}
