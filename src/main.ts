import cytoscape, {
  ElementDefinition,
  ElementsDefinition,
  Stylesheet,
} from "cytoscape";
import { getInitData, containerName } from "./app/services/initial";
import { IResponseBody } from "./app/models/i-response-body";
import { UtilityService } from "./app/services/utility";
import graphStyles from "./app/services/styles";
import cxtmenu from "cytoscape-cxtmenu";

customElements.define(
  "graph-element",
  class extends HTMLElement {
    cy!: cytoscape.Core;
    utlityService;

    constructor() {
      super();
      this.utlityService = new UtilityService();
      cytoscape.use(cxtmenu);
    }

    async connectedCallback() {
      const _self = this;
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
          style: this.utlityService.getNodeStyle(response.p.start.labels[0]),
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

      this.cy.cxtmenu({
        selector: "node, edge",

        commands: [
          {
            content: "Expand",
            select: function (ele) {
              _self.expandSubNodes(ele.id());
            },
          },

          {
            content: "X",
            select: function (ele) {
              console.log(ele.data("name"));
            },
            enabled: false,
          },

          {
            content: "Text",
            select: function (ele) {
              console.log(ele);
            },
          },
        ],
      });
    }

    createContainerElement() {
      const container = document.createElement("div");
      container.setAttribute("id", containerName);
      this.appendChild(container);
      return container;
    }

    async expandSubNodes(id: string) {
      const response: IResponseBody[] = (await getInitData(
        id
      )) as IResponseBody[];
      if (response.length) {
        const graphBody: any[] = [];
        response.forEach((item, index) => {
          graphBody.push({
            group: "nodes",
            data: {
              id: item.p.end.elementId,
              name: this.utlityService.getNodeName(
                item.p.end.labels[0],
                item.p.end.properties
              ),
              ...item.p.end,
            },
            // position: { x: 100 * index + 1, y: 100 * index + 1 },
            style: this.utlityService.getNodeStyle(item.p.end.labels[0]),
          });

          item.p.segments.forEach((segment) => {
            graphBody.push({
              group: "edges",
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
        this.cy.stop();
        this.cy.add(graphBody);
        this.cy
          .layout({
            name: "cose",
          })
          .run();
      }
    }
  }
);
