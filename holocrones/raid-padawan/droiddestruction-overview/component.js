import { HolocronBase } from "../../../services/holocron.service.js";

class DroidDestructionOverviewHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-padawan";
  }
  getHolocronId() {
    return "droiddestruction-overview";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-padawan-droiddestruction-overview", DroidDestructionOverviewHolocron);
