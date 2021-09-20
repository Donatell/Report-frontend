import {TransneftBase} from "./transneft-base";

export class TransneftPriceCategory {
    id: number;
    transneftBase: TransneftBase;
    description: string;

    constructor(id: number, transneftBase: TransneftBase, description: string) {
        this.id = id;
        this.transneftBase = transneftBase;
        this.description = description;
    }
}
