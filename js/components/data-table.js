class DataTable extends HTMLElement {

  constructor() {
    super();

    this._isSearchable = false;
    this._rows = [];
    this._columns = [];
    this._filters = [];

    this._activeFilters = {};
  }

  connectedCallback() {
  }

  initialize({
    rows = [],
    columns = [],
    filters = []
  }) {
    this._rows = rows;
    this._columns = columns;
    this._filters = filters;

    this.render();
  }

  render() {
    if (!this._columns.length) return;
    this.innerHTML = `
      ${this.renderFilters()}
      <table class="data-table">
        ${this.renderHeader()}
        <tbody class="data-table-body"></tbody>
      </table>
    `;
    this.attachFilterListeners();
    this.updateRows();
  }
  updateRows() {
    const tbody = this.querySelector(".data-table-body");
    tbody.innerHTML = this.renderRows(
      this.getFilteredRows()
    );
  }
  renderHeader() {
    return `
      <thead>
        <tr>
          ${this._columns.map(c =>
            `<th>${c.label}</th>`
          ).join("")}
        </tr>
      </thead>
    `;
  }
  renderRows(rows) {
    if (!rows.length) {
      return `
        <tr>
          <td colspan="${this._columns.length}">
            No data available
          </td>
        </tr>
      `;
    }
    return rows.map(row => `
      <tr>
        ${this._columns.map(col =>
          `<td>${row[col.field] ?? ""}</td>`
        ).join("")}
      </tr>
    `).join("");
  }
  renderFilters() {
    if (!this._filters.length) {
      return "";
    }

    return `
      <div class="data-table-filters">
        ${this._filters.map(filter => `
          <div class="filter-group">
            <label class="filter-label" for="filter-${filter.field}">
              ${filter.label}
            </label>

            <select
              id="filter-${filter.field}"
              class="filter-select"
              data-filter="${filter.field}"
            >
              <option value="">Todos</option>

              ${this.getFilterValues(filter.field)
                .map(value => `
                  <option value="${value}">
                    ${value}
                  </option>
                `)
                .join("")}
            </select>
          </div>
        `).join("")}
      </div>
    `;
  }
  getFilteredRows() {
    return this._rows.filter(row => {
      return Object.entries(this._activeFilters)
        .every(([field, value]) => {
          if (!value) {
            return true;
          }
          return row[field] === value;
        });
    });
  }
  getFilterValues(field) {
    return [...new Set(
      this._rows
        .map(row => row[field])
        .filter(Boolean)
    )].sort();
  }
  attachFilterListeners() {
    this.querySelectorAll("select[data-filter]")
      .forEach(select => {
        select.addEventListener("change", event => {
          const field = event.target.dataset.filter;
          const value = event.target.value;
          if (value) {
            this._activeFilters[field] = value;
          } else {
            delete this._activeFilters[field];
          }
          this.updateRows();
        });
      }
    );
  }
}

customElements.define("data-table", DataTable);