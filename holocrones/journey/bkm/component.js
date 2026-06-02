import { HolocronBase } from "../../../services/holocron.service.js";

class JourneyBoKatanMandalorHolocron extends HolocronBase {

  getHolocronCategory() {
    return "journey";
  }
  getHolocronId() {
    return "bkm";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-journey-bkm", JourneyBoKatanMandalorHolocron);
