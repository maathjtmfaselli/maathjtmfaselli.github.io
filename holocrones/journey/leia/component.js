import { HolocronBase } from "../../../services/holocron.service.js";

class JourneyLeiaHolocron extends HolocronBase {

  getHolocronCategory() {
    return "journey";
  }
  getHolocronId() {
    return "leia";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-journey-bkm", GuildPrioritiesHolocron);
