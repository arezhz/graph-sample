import { BanksEnum } from "../enums/banks.enum";
import { NodeLabelEnum } from "../enums/node-label.enum";
import { IProperties } from "../models/i-properties";

interface BankListInterface {
  key: BanksEnum;
  value: string;
  name: string;
}
export class UtilityService {
  private _BankList: BankListInterface[] = [
    {
      key: BanksEnum.Unknown,
      value: "نامشخص",
      name: "unknown",
    },
    {
      key: BanksEnum.Mellat,
      value: "آینده",
      name: "mellat",
    },
    {
      key: BanksEnum.Refah,
      value: "رفاه",
      name: "refah",
    },
    {
      key: BanksEnum.Sepah,
      value: "سپه",
      name: "sepah",
    },
    {
      key: BanksEnum.Keshavarzi,
      value: "کشاورزی",
      name: "keshavarzi",
    },
    {
      key: BanksEnum.Meli,
      value: "ملی",
      name: "bmi",
    },
    {
      key: BanksEnum.Tejarat,
      value: "تجارت",
      name: "tejarat",
    },
    {
      key: BanksEnum.Saderat,
      value: "صادرات",
      name: "saderat",
    },
    {
      key: BanksEnum.EghtesadNovin,
      value: "اقتصاد نوین",
      name: "en",
    },
    {
      key: BanksEnum.Saman,
      value: "سامان",
      name: "saman",
    },
    {
      key: BanksEnum.Pasargard,
      value: "پاسارگاد",
      name: "pasargard",
    },
    {
      key: BanksEnum.Shahr,
      value: "شهر",
      name: "shahr",
    },
    {
      key: BanksEnum.Ayandeh,
      value: "آینده",
      name: "ayandeh",
    },
    {
      key: BanksEnum.Gardeshgari,
      value: "گردشگری",
      name: "gardeshgari",
    },
    {
      key: BanksEnum.Khavarmiane,
      value: "خاورمیانه",
      name: "khavarmiane",
    },
  ];

  get BankList() {
    return this._BankList;
  }
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

  getNodeStyle(type: NodeLabelEnum, data?: IProperties) {
    switch (type) {
      case "Person":
        return {
          "background-image": "src/assets/person.png",
        };
      // case "Country":
      //   return data.name;
      // case "Address":
      //   return data.address;
      // case "SIMCard":
      //   return data.number;
      case "Sheba":
        const bankDetail = this.BankList.find((f) => f.key == data?.bank_code);
        return {
          "background-image": `src/assets/banks/${bankDetail?.name}.png`,
        };
      // case "SocialAccount":
      //   return data.id;
    }
  }

   createContainerElement(id: string) {
      const container = document.createElement("div");
      container.setAttribute("id", id);
      return container;
    }
}
