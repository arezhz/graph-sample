import { NodeLabelEnum } from "../enums/node-label.enum";
import { IProperties } from "./i-properties";

export interface INodeBody {
  identity: number;
  labels: NodeLabelEnum[];
  properties: IProperties;
  elementId: string;
}
