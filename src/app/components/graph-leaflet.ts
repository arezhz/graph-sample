export default customElements.define(
  "graph-leaflet",
  class extends HTMLElement {
    connectedCallback() {
      const container = document.createElement("div");
      container.setAttribute("id", "testttttt");
      this.appendChild(container);
    }
  }
);
