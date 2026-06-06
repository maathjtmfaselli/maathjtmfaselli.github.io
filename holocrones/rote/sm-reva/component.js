import { HolocronBase } from "../../../services/holocron.service.js";

class RoteSmRevaHolocron extends HolocronBase {

  getHolocronCategory() {
    return "rote";
  }
  getHolocronId() {
    return "sm-reva";
  }
  async loadData() {
  }

  afterRender() {
  }

  static get observedAttributes() {
    return [];
  }

  async connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // Cleanup if needed
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Handle attribute changes if needed
  }

  async render() {
    try {
      const response = await fetch(
        new URL('./template.html', import.meta.url)
      );
      const html = await response.text();
      this.innerHTML = html;
    } catch (error) {
      console.error('Error loading template for holocron rote/sm-reva:', error);
      this.innerHTML = '<p>Error loading content</p>';
    }
  }
}

customElements.define('holocron-rote-sm-reva', RoteSmRevaHolocron);