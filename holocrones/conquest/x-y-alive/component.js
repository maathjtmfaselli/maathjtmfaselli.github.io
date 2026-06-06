import { HolocronBase } from "../../../services/holocron.service.js";

class ConquestXYAliveHolocron extends HolocronBase {

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

customElements.define("holocron-conquest-x-y-alive", ConquestXYAliveHolocron);
