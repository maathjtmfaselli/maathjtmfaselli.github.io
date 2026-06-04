import { HolocronBase } from "../../../services/holocron.service.js";

class RoteSMBraccaHolocron extends HolocronBase {

  getHolocronCategory() {
    return "rote";
  }
  getHolocronId() {
    return "sm-bracca";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-rote-sm-bracca", RoteSMBraccaHolocron);
