import cytoscape, { ElementDefinition, ElementsDefinition } from "cytoscape";
import { getInitData, containerName } from "./initial";
import { IResponseBody } from "./models/i-response-body";

customElements.define(
  "graph-element",
  class extends HTMLElement {
    cy!: cytoscape.Core;

    async connectedCallback() {
      const response: IResponseBody | IResponseBody[] = await getInitData();
      const container = this.createContainerElement();
      const elements:
        | ElementsDefinition
        | ElementDefinition[]
        | Promise<ElementsDefinition>
        | Promise<ElementDefinition[]>
        | undefined = {
        nodes: [],
        edges: [],
      };
      if (!Array.isArray(response)) {
        elements.nodes.push({
          data: {
            id: response.p.start.elementId,
            ...response.p.start,
          },
        });
      }
      this.cy = cytoscape({
        container,
        elements,
        style: [
          // the stylesheet for the graph
          {
            selector: "node",
            style: {
              "background-color": "#666",
              label: "data(id)",
            },
          },

          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#ccc",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ],
        layout: {
          name: "cose",
        },
      });
    }

    createContainerElement() {
      const container = document.createElement("div");
      container.setAttribute("id", containerName);
      this.appendChild(container);
      return container;
    }
  }
);
