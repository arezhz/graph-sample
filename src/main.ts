import cytoscape from 'cytoscape';
import { getInitData,containerName } from "./initial";

customElements.define(
  "graph-element",
  class extends HTMLElement {
    async connectedCallback() {
      const response = await getInitData();
      const container = this.createContainerElement();
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      cytoscape({container})
    }

    createContainerElement() {
      const container = document.createElement("div");
      container.setAttribute('id', containerName);
      this.appendChild(container);
      return container;
    }
  }
);
