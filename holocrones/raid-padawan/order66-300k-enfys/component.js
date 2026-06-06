import { HolocronBase } from "../../../services/holocron.service.js";

class Order66300kEnfysHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-padawan";
  }
  getHolocronId() {
    return "order66-300k-enfys";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-padawan-order66-300k-enfys", Order66300kEnfysHolocron);
