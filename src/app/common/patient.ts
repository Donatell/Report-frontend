import * as moment from "moment";

export class Patient {
    id: number | null = null;
    fullName: string;
    factorCodes: string;
    profession: string | null = null;
    department: string | null = null;
    birthDate: Date;

    constructor(fullName: string, birthDate: Date | number | string, factorCodes: string) {
        this.fullName = fullName;

        // birth date can be an excel date serial number
        if (typeof birthDate == "number") {
            this.birthDate = new Date(Math.round((birthDate - 25569) * 86400 * 1000))
        } else if (typeof birthDate == "string") {
            this.birthDate = moment(birthDate, "DD.MM.YYYY").toDate();
        } else {
            this.birthDate = birthDate;
        }
        this.factorCodes = factorCodes;
    }
}
