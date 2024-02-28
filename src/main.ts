import cytoscape from "cytoscape";
import { getInitData, containerName } from "./initial";
import { IResponseBody } from "./models/i-response-body";

customElements.define(
  "graph-element",
  class extends HTMLElement {
    async connectedCallback() {
      const response: IResponseBody[] = await getInitData();
      const container = this.createContainerElement();
      const elements = this.createElements(response);
      const cy = cytoscape({
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

      });
      cy.layout({
        name:  "cose"
      }).run();
    }

    createContainerElement() {
      const container = document.createElement("div");
      container.setAttribute("id", containerName);
      this.appendChild(container);
      return container;
    }

    createElements(body: IResponseBody[]) {
      const result: any[] = [];
      body.forEach((item: IResponseBody) => {
        const startNode = item.p.start;
        const hasStartNode = result.find((f) => f.id === startNode.elementId);
        if (hasStartNode === undefined || !hasStartNode) {
          result.push({
            data: {
              id: startNode.elementId,
              ...startNode,
            },
          });
        }
        const endNode = item.p.end;
        const hasEndNode = result.find((f) => f.id === endNode.elementId);
        if (hasEndNode === undefined || !hasEndNode) {
          result.push({
            data: { id: endNode.elementId, ...endNode },
          });
        }
        item.p.segments.forEach((segment) => {
          result.push({
            data: {
              id: segment.relationship.elementId,
              source: segment.relationship.startNodeElementId,
              target: segment.relationship.endNodeElementId,
              type: segment.relationship.type,
              properties: segment.relationship.properties,
            },
          });
        });
      });
      return result;
    }
  }
);
