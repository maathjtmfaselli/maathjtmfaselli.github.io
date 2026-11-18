import { HolocronBase } from "../../../services/holocron.service.js";
import { Order66Service } from "../../../services/order66.service.js";
import { DroidDestructionService } from "../../../services/droidDestruction.service.js";
import { RoteService } from "../../../services/rote.service.js";
import { initGridPriorityProgress, initGridGuildRanksProgress } from "../../../js/grid-priority-progress.js";

const DROIDDESTRUCTION_GUILD_TOTAL_TARGET = 375;
const ORDEN66_GUILD_TOTAL_TARGET = 245;
const GUILD_PADAWAN_TARGET = 5;

class GuildPrioritiesHolocron extends HolocronBase {

  constructor() {
    super();
    this.order66Service = new Order66Service();
    this.droidDestructionService = new DroidDestructionService();
    this.roteService = new RoteService();
  }

  getHolocronCategory() {
    return "guild";
  }
  getHolocronId() {
    return "goals";
  }

  async loadData() {
    const droidDestructionRows = await this.droidDestructionService.loadHistoricalData();
    const droidDestructionGuildTheoreticalMaxScore = this.droidDestructionService.getGuildTheoreticalMaxScore(droidDestructionRows)
    const droidDestructionRankCounts = this.droidDestructionService.getRankCounts(droidDestructionRows);
    const order66Rows = await this.order66Service.loadHistoricalData();
    const roteMetrics = await this.roteService.getLatestMetrics();

    this.renderGuildTheoreticalMaxScore("#droiddestruction-goal-guild", droidDestructionGuildTheoreticalMaxScore, DROIDDESTRUCTION_GUILD_TOTAL_TARGET);
    this.renderGuildTheoreticalMaxScore("#order66-goal-guild", this.order66Service.getGuildTheoreticalMaxScore(order66Rows), ORDEN66_GUILD_TOTAL_TARGET);
    this.renderGuildRaidProgress("#droiddestruction-goal-individual", droidDestructionRankCounts, GUILD_PADAWAN_TARGET);
    this.renderGuildRaidProgress("#order66-goal-individual", this.order66Service.getRankCounts(order66Rows), GUILD_PADAWAN_TARGET);
    this.renderPriority("zeffo", roteMetrics.zeffo);
    this.renderPriority("mandalor", roteMetrics.mandalor);
  }

  renderGuildTheoreticalMaxScore(goalItem, guildTheoreticalMaxScore, goalTarget) {
    const goal = this.querySelector(goalItem);
    if (!goal) return;

    const progressBar = goal.querySelector(".progress-bar");
    const progressLabel = goal.querySelector(".progress-label");
    if (!progressBar || !progressLabel) return;

    const scoreM = Math.round(guildTheoreticalMaxScore / 1_000);
    progressBar.value = scoreM;
    progressLabel.textContent = `${scoreM} / ${goalTarget}`;
    goal.classList.toggle("goal-completed", scoreM >= goalTarget);
  }

  renderGuildRaidProgress(goalItem, rankCounts, target) {
    const goal = this.querySelector(goalItem);
    if (!goal) return;

    const progress = goal.querySelector(".priority-progress");
    if (!progress) return;

    progress.dataset.grandMaster = rankCounts.grandMaster;
    progress.dataset.knight = rankCounts.knight;
    progress.dataset.padawan = rankCounts.padawan;
//console.log(rankCounts);
    goal.classList.toggle("goal-completed", rankCounts.padawan <= target);
  }

  renderPriority(target, data) {
    const el = document.getElementById(`guild-rote-progress-${target}`);

    if (!el || !data) return;

    el.dataset.completed = data.completed;
    el.dataset.attempted = data.attempted;
    el.dataset.eligible = data.eligible;

    this.querySelector(`#rote-goal-${target}`)?.classList.toggle(
      "goal-completed",
      Number(el.dataset.completed) >= Number(el.dataset.target)
    );
  }

  afterRender() {
    if (typeof initGridPriorityProgress === "function") {
      initGridPriorityProgress(this);
    }
    if (typeof initGridGuildRanksProgress === "function") {
      initGridGuildRanksProgress(this);
    }
  }
}

customElements.define("holocron-guild-goals", GuildPrioritiesHolocron);
