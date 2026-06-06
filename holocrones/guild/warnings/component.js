import { GuildWarningsService } from "../../../services/guild-warning.service.js";

class GuildWarningsHolocron extends HTMLElement {

  constructor() {
    super();
    this.warningsService = new GuildWarningsService();
  }

  async connectedCallback() {
    const template = await fetch("/holocrones/guild/warnings/template.html")
      .then(r => r.text());

    this.innerHTML = template;

    await this.loadData();
  }

  async loadData() {
    const warnings = await this.warningsService.getWarnings();
    console.log(warnings);
    this.renderWarnings(warnings);
  }

  renderWarnings(warnings) {
    const list = document.getElementById("guild-warnings-list");
    if (!list) return;

    if (!warnings.length) {
      list.innerHTML = `
        <li class="priority-item">
          Ahora mismo, NO hay miembros con Tarjetas Amarillas
        </li>
      `;
      return;
    }

    list.innerHTML = warnings
      .map(warning => this.renderWarningItem(warning))
      .join("");
  }

  renderWarningItem(warning) {
    return `
      <li class="priority-item guild-warning">
        <div class="priority-progress-player">
          <div class="priority-metric">
            ${warning.name}
          </div>
        </div>

        <div class="priority-target">
          <div class="player-badges">
            ${this.renderCanDoZeffoBadge(warning)}
            ${this.renderCanDoMandalorBadge(warning)}
          </div>
        </div>

        <div class="progress-wrapper">
          <progress
            class="progress-bar"
            value="${warning.order66MaxScore}"
            max="3000">
          </progress>

          <span class="progress-label">
            ${warning.order66MaxScore}k / 3000k
          </span>
        </div>
      </li>
    `;
  }

  renderCanDoZeffoBadge(warning) {
    const color = warning.canDoBracca
      ? "green"
      : "red";

    return `
      <img
        src="https://img.shields.io/badge/zeffo-${color}"
        />
    `;
  }

  renderCanDoMandalorBadge(warning) {
    const color = warning.canDoTatooine
      ? "green"
      : "red";

    return `
      <img
        src="https://img.shields.io/badge/mandalor-${color}"
        />
    `;
  }
}

customElements.define("holocron-guild-warnings", GuildWarningsHolocron);
