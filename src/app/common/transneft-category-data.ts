import {TransneftBase} from "./transneft-base";
import {TransneftPriceCategory} from "./transneft-price-category";

export class TransneftCategoryData {
    patientId: number;
    fullName: string;
    transneftBase: TransneftBase | null;
    transneftPriceCategory: TransneftPriceCategory | number | null;

    constructor(patientId: number, fullName: string, transneftBase: TransneftBase, transneftPriceCategory: TransneftPriceCategory) {
        this.patientId = patientId;
        this.fullName = fullName;
        this.transneftBase = transneftBase;
        this.transneftPriceCategory = transneftPriceCategory;
    }
}
