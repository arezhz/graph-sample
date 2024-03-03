import cytoscape, {
  ElementDefinition,
  ElementsDefinition,
  Stylesheet,
} from "cytoscape";
import { getInitData, containerName } from "./app/services/initial";
import { IResponseBody } from "./app/models/i-response-body";
import { UtilityService } from "./app/services/utility";
import graphStyles from "./app/services/styles";

customElements.define(
  "graph-element",
  class extends HTMLElement {
    cy!: cytoscape.Core;
    utlityService;

    constructor() {
      super();
      this.utlityService = new UtilityService();
    }

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
          group: "nodes",
          data: {
            id: response.p.start.elementId,
            name: this.utlityService.getNodeName(
              response.p.start.labels[0],
              response.p.start.properties
            ),
            ...response.p.start,
          },
          style: this.utlityService.getNodeStyle(response.p.start.labels[0])
        });
      }
      this.cy = cytoscape({
        container,
        elements,
        style: graphStyles as unknown as Stylesheet[],
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
