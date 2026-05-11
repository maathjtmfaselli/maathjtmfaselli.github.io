class GuildPrioritiesHolocron
  extends HTMLElement {

  async connectedCallback() {

    const template =
      await fetch(
        "/holocrones/guild/goals/template.html"
      ).then(r => r.text());

    this.innerHTML = template;

    /*
     * 🔥 IMPORTANTÍSIMO:
     * aquí se reactiva lógica externa
     */
    this.afterRender();
  }

  afterRender() {

    /*
     * Reutiliza vuestro sistema existente
     * de progress bars
     */
    if (typeof initGridPriorityProgress === "function") {
      initGridPriorityProgress(this);
    }

  }
}

customElements.define(
  "holocron-guild-goals",
  GuildPrioritiesHolocron
);
