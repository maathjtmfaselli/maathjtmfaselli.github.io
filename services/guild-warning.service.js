import { Order66Service } from "./order66.service.js";
import { RegistryDao } from "./dao/registry.dao.js";

const MIN_ORDER66_SCORE = 3000;
const MEMBERS_NEVER_SUCCEEDED_ON_BRACCA = new Set([
     'Was',
     'VIRUS',
     'Dark Iskender',
     'Kaneris',
     'technochurchill',
     'Chinadapowers',
     'Mariskal101DA',
     'Nakillo',
     'Tantema RayGarnik',
     'JokerVerde',
     'Kairas',
     'Dende',
     'Sirkix'
   ]);

export class GuildWarningsService {

  constructor() {
    this.order66Service = new Order66Service();
    this.guildMembersProcessedDataDao = RegistryDao.getMembersProcessed();
  }

  async getWarnings() {
    const order66HistoricalData = await this.order66Service.loadHistoricalData();
    const processedGuildData = await this.guildMembersProcessedDataDao.loadGuildMembersProcessedData();

    return processedGuildData.members
      .map(member => this.evaluateMember(member, order66HistoricalData))
      .filter(memberEvaluationResult => this.hasWarning(memberEvaluationResult))
      .sort((a, b) => this.compareExpulsionPriority(a, b));
  }

  evaluateMember(member, order66HistoricalData) {
    const order66MaxScore = this.getOrder66MaxScore(member, order66HistoricalData);

    return {
      member,
      canDoBracca: member.canDoBracca,
      successOnBracca: !MEMBERS_NEVER_SUCCEEDED_ON_BRACCA.has(member.name),
      canDoTatooine: member.canDoTatooine,
      raidCompliant: (order66MaxScore != null && order66MaxScore >= MIN_ORDER66_SCORE),
      order66MaxScore
    };
  }

  hasWarning({ canDoBracca, canDoTatooine, successOnBracca, raidCompliant }) {
        return !canDoBracca
          || !successOnBracca
          || !canDoTatooine
          || !raidCompliant;
  }

  compareExpulsionPriority(a, b) {
    if (a.canDoBracca !== b.canDoBracca) return a.canDoBracca ? 1 : -1;
    if (a.successOnBracca !== b.successOnBracca) return a.successOnBracca ? 1 : -1;
    return a.order66MaxScore - b.order66MaxScore;
  }

  getOrder66MaxScore(member, historicalData) {
    const historicalMember = historicalData.find(row => row.Jugador === member.name);

    return this.order66Service.getMaxScoreByMemberName(historicalMember);
  }

}