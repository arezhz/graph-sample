import cytoscape from "cytoscape";
import { getInitData, containerName } from "./initial";
import { IResponseBody } from "./models/i-response-body";

customElements.define(
  "graph-element",
  class extends HTMLElement {
    async connectedCallback() {
      const response: IResponseBody[] = await getInitData();
      const container = this.createContainerElement();
      this.createElements(response);
      cytoscape({ container });
    }

    createContainerElement() {
      const container = document.createElement("div");
      container.setAttribute("id", containerName);
      this.appendChild(container);
      return container;
    }

    createElements(body: IResponseBody[]) {
      console.log("====================================");
      console.log(body);
      console.log("====================================");
    }
  }
);
