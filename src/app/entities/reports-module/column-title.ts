export class ColumnTitle {
    id: number;
    title: string;
    patientColumn: string;

    constructor(id: number, title: string, patientColumn: string) {
        this.id = id;
        this.title = title;
        this.patientColumn = patientColumn;
    }
}
