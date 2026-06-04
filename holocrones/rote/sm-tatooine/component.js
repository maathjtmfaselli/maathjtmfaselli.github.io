import { HolocronBase } from "../../../services/holocron.service.js";

class RoteSMTatooineHolocron extends HolocronBase {

  getHolocronCategory() {
    return "rote";
  }
  getHolocronId() {
    return "sm-tatooine";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-rote-sm-tatooine", RoteSMTatooineHolocron);
