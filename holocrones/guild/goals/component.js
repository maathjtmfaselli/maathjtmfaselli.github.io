import { Order66Service } from "../../../services/order66.service.js";
import { RoteService } from "../../../services/rote.service.js";

class GuildPrioritiesHolocron extends HTMLElement {

  constructor() {
    super();
    this.order66Service = new Order66Service();
    this.roteService = new RoteService();
  }

  async connectedCallback() {
    const template = await fetch("/holocrones/guild/goals/template.html")
      .then(r => r.text());

    this.innerHTML = template;

    await this.loadData();

    this.afterRender();
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

    label.textContent = `${scoreM} / 245`;
  }

  renderGuildRankProgress(rankCounts) {
    const progress = this.querySelector("#guild-raid-progress");

    if (!progress) {
      return;
    }

    progress.dataset.grandMaster = rankCounts.grandMaster;
    progress.dataset.knight = rankCounts.knight;
    progress.dataset.padawan = rankCounts.padawan;
  }

  renderPriority(target, data) {
    const el = document.getElementById(`guild-rote-progress-${target}`);

    if (!el || !data) return;

    el.dataset.completed = data.completed;
    el.dataset.attempted = data.attempted;
    el.dataset.eligible = data.eligible;

    // regla de negocio UI (si existe)
    el.dataset.target = data.eligible;
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
