import { HolocronBase } from "../../../services/holocron.service.js";
import { Order66Service } from "../../../services/order66.service.js";
import { RoteService } from "../../../services/rote.service.js";
import { initGridPriorityProgress, initGridGuildRanksProgress } from "../../../js/grid-priority-progress.js";

const ORDEN66_GUILD_TOTAL_TARGET = 245;
const ORDEN66_GUILD_PADAWAN_TARGET = 5;

class GuildPrioritiesHolocron extends HolocronBase {

  constructor() {
    super();
    this.order66Service = new Order66Service();
    this.roteService = new RoteService();
  }

  getHolocronCategory() {
    return "guild";
  }
  getHolocronId() {
    return "goals";
  }

  async loadData() {
    const order66Rows = await this.order66Service.loadHistoricalData();
    const roteMetrics = await this.roteService.getLatestMetrics();

    this.renderGuildTheoreticalMaxScore(this.order66Service.getGuildTheoreticalMaxScore(order66Rows));
    this.renderGuildRankProgress(this.order66Service.getRankCounts(order66Rows));
    this.renderPriority("zeffo", roteMetrics.zeffo);
    this.renderPriority("mandalor", roteMetrics.mandalor);
  }

  renderGuildTheoreticalMaxScore(guildTheoreticalMaxScore) {
    const progress = this.querySelector("#guild-score-progress");
    const label = this.querySelector("#guild-score-label");

    if (!progress || !label) {
      return;
    }

    const scoreM = Math.round(guildTheoreticalMaxScore / 1_000);

    progress.value = scoreM;

    label.textContent = `${scoreM} / ${ORDEN66_GUILD_TOTAL_TARGET}`;

    this.querySelector("#order66-goal-total")?.classList.toggle(
      "goal-completed",
      scoreM >= ORDEN66_GUILD_TOTAL_TARGET
    );
  }

  renderGuildRankProgress(rankCounts) {
    const progress = this.querySelector("#guild-raid-progress");

    if (!progress) {
      return;
    }

    progress.dataset.grandMaster = rankCounts.grandMaster;
    progress.dataset.knight = rankCounts.knight;
    progress.dataset.padawan = rankCounts.padawan;

    this.querySelector("#order66-goal-padawan")?.classList.toggle(
      "goal-completed",
      rankCounts.padawan <= ORDEN66_GUILD_PADAWAN_TARGET
    );
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
