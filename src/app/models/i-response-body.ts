import { INodeBody } from "./i-node-body";
import { IRelationshipBody } from "./i-relationship-body";

export interface IResponseBody {
  p: {
    start: INodeBody;
    end: INodeBody;
    segments: {
      start: INodeBody;
      relationship: IRelationshipBody;
      end: INodeBody;
    }[];
    length: number;
  };
}
