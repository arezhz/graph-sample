import { RelationshipTypeEnum } from "../enums/relationship-type.enum";
import { IProperties } from "./i-properties";

export interface IRelationshipBody {
    identity: number;
    start: number;
    end: number;
    type: RelationshipTypeEnum;
    properties: IProperties;
    elementId: string;
    startNodeElementId: string;
    endNodeElementId: string;
  };