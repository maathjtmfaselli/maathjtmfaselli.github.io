import { HolocronBase } from "../../../services/holocron.service.js";

class ConquestXYAliveHolocron extends HolocronBase {

  getHolocronCategory() {
    return "conquest";
  }
  getHolocronId() {
    return "x-y-alive";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-conquest-x-y-alive", ConquestXYAliveHolocron);
