import { DroidDestructionService } from "./droidDestruction.service.js";
import { RegistryDao } from "./dao/registry.dao.js";

const MEMBERS_NEVER_SUCCEEDED_ON_BRACCA = new Set([
     'Was',
     'VIRUS',
     'Dark Iskender',
     'Kaneris',
     'technochurchill',
     'Chinadapowers',
     'Mariskal101DA',
     'Nakillo',
     'JokerVerde',
     'Kairas',
     'Dende',
     'Sirkix',
     'Rigel Cygnus'
   ]);

export class GuildWarningsService {

  constructor() {
    this.droidDestructionService = new DroidDestructionService();
    this.guildMembersProcessedDataDao = RegistryDao.getMembersProcessed();
  }

  async getWarnings() {
    const raidHistoricalData = await this.droidDestructionService.loadHistoricalData();
    const processedGuildData = await this.guildMembersProcessedDataDao.loadGuildMembersProcessedData();

    return processedGuildData.members
      .map(member => this.evaluateMember(member, raidHistoricalData))
      .filter(memberEvaluationResult => this.hasWarning(memberEvaluationResult))
      .sort((a, b) => this.compareExpulsionPriority(a, b));
  }

  evaluateMember(member, raidHistoricalData) {
    const raidMaxScore = this.getRaidMaxScore(member, raidHistoricalData);

    return {
      member,
      canDoBracca: member.canDoBracca,
      successOnBracca: !MEMBERS_NEVER_SUCCEEDED_ON_BRACCA.has(member.name),
      canDoTatooine: member.canDoTatooine,
      raidCompliant: (raidMaxScore != null && raidMaxScore >= this.droidDestructionService.getRankThresholds().knight),
      raidMaxScore
    };
  }

  hasWarning({ canDoBracca, canDoTatooine, successOnBracca, raidCompliant }) {
        return !canDoBracca
          || !successOnBracca;
//          || !canDoTatooine
//          || !raidCompliant;
  }

  compareExpulsionPriority(a, b) {
    if (a.canDoBracca !== b.canDoBracca) return a.canDoBracca ? 1 : -1;
    if (a.successOnBracca !== b.successOnBracca) return a.successOnBracca ? 1 : -1;
    return a.raidMaxScore - b.raidMaxScore;
  }

  getRaidMaxScore(member, historicalData) {
    const historicalMember = historicalData.find(row => row.Jugador === member.name);

    return this.droidDestructionService.getMaxScoreByMemberName(historicalMember);
  }

}