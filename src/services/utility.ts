import { NodeLabelEnum } from "../enums/node-label.enum";
import { IProperties } from "../models/i-properties";

export class UtilityService {
  getNodeName(type: NodeLabelEnum, data: IProperties) {
    switch (type) {
      case "Person":
        return data.national_number;
      case "Country":
        return data.name;
      case "Address":
        return data.address;
      case "SIMCard":
        return data.number;
      case "Sheba":
        return data.bank;
      case "SocialAccount":
        return data.id;
    }
  }
}

