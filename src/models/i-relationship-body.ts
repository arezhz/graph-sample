import { RelationTypeEnum } from "../enums/relation-type.enum";
import { RelationshipTypeEnum } from "../enums/relationship-type.enum";

export interface IRelationshipBody {
    identity: number;
    start: number;
    end: number;
    type: RelationshipTypeEnum;
    properties: {
      relation: RelationTypeEnum;
    };
    elementId: string;
    startNodeElementId: string;
    endNodeElementId: string;
  };