// used for tabular representation of lists

import {Module} from "./module";

export interface PatientListData {
    id: number;
    companyName: string;
    patientQuantity: number;
    creationDate: string;
    processStep: number;
}

export class PatientList implements PatientListData {
    id: number
    companyName: string;
    extraService: string;
    creationDate: string;
    patientQuantity: number;
    processStep: number;
    moduleId: number | Module;

    constructor(id: number, companyName: string, extraService: string, patientQuantity: number, creationDate: Date, processStep: number, moduleId: number | Module) {
        this.id = id
        this.companyName = companyName;
        this.extraService = extraService;
        this.creationDate = creationDate.toDateString();
        this.patientQuantity = patientQuantity;
        this.processStep = processStep;
        this.moduleId = moduleId;
    }
}
