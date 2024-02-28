import { NodeLabelEnum } from "../enums/node-label.enum";

export interface INodeBody {
  identity: number;
  labels: NodeLabelEnum[];
  properties: {
    father_name: string;
    birth_date: string;
    last_name: string;
    national_number: string;
    first_name: string;
  };
  elementId: string;
}
