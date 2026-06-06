import { HolocronBase } from "../../../services/holocron.service.js";

class Order661800kKelleranHolocron extends HolocronBase {

  getHolocronCategory() {
    return "raid-knight";
  }
  getHolocronId() {
    return "order66-1800k-kelleran";
  }

  async loadData() {
  }

  afterRender() {
  }
}

customElements.define("holocron-raid-knight-order66-1800k-kelleran", Order661800kKelleranHolocron);
