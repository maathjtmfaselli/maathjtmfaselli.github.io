import { Order66Service } from "../../../services/order66.service.js";

class GuildPrioritiesHolocron extends HTMLElement {

  constructor() {
    super();
    this.order66Service = new Order66Service();
  }

  async connectedCallback() {
    const template = await fetch("/holocrones/guild/goals/template.html")
      .then(r => r.text());

    this.innerHTML = template;

    await this.loadData();

    this.afterRender();
  }

  async loadData() {
    const rows = await this.order66Service.loadHistoricalData();
    const guildTheoreticalMaxScore = this.order66Service.getGuildTheoreticalMaxScore(rows);
    const rankCounts = this.order66Service.getRankCounts(rows);
    this.renderGuildTheoreticalMaxScore(guildTheoreticalMaxScore);
    this.renderRankCounts(rankCounts);
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

  renderRankCounts(rankCounts) {
    const progress = this.querySelector("#guild-raid-progress");

    if (!progress) {
      return;
    }

    progress.dataset.grandMaster = rankCounts.grandMaster;
    progress.dataset.knight = rankCounts.knight;
    progress.dataset.padawan = rankCounts.padawan;
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
