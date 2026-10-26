import { HolocronBase } from "../../../services/holocron.service.js";

class DroidDestructionOverviewHolocron extends HolocronBase {

  getHolocronCategory() {
    return "archive";
  }
  getHolocronId() {
    return "droiddestruction-overview";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-archive-droiddestruction-overview", DroidDestructionOverviewHolocron);
