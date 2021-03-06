import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as FileSaver from "file-saver";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

export enum REPORT_TYPE {
    GENERAL_AND_DETAILED,
    GENERAL,
    DETAILED,
}

@Injectable({
    providedIn: 'root'
})
export class FileDownloadService {
    private baseUrl = environment.apiUrl + '/download/'

    constructor(private httpClient: HttpClient,
                private _snackBar: MatSnackBar,
                private router: Router) {
    }

    downloadReport(patientListId: number, reportType: REPORT_TYPE, companyName: string) {
        switch (reportType) {
            case REPORT_TYPE.GENERAL_AND_DETAILED:
                this.downloadGeneralReport(patientListId, companyName);
                this.downloadDetailedReport(patientListId, companyName);
                break;
            case REPORT_TYPE.GENERAL:
                this.downloadGeneralReport(patientListId, companyName);
                break;
            case REPORT_TYPE.DETAILED:
                this.downloadDetailedReport(patientListId, companyName);
                break;

        }
    }

    private downloadGeneralReport(patientListId: number, companyName: string) {
        this.httpClient.get(this.baseUrl + patientListId + "/" + REPORT_TYPE.GENERAL, {responseType: 'blob'}).subscribe(value => {
            FileSaver.saveAs(value, companyName + ' общая спецификация.xlsx')
        }, error => {
            this.router.navigate(["/reports/patient-lists"]);
            this._snackBar.open(error.error, "ОК");
        });
    }

    private downloadDetailedReport(patientListId: number, companyName: string) {
        this.httpClient.get(this.baseUrl + patientListId + "/" + REPORT_TYPE.DETAILED, {responseType: 'blob'}).subscribe(value => {
            FileSaver.saveAs(value, companyName + ' поимённая спецификация.xlsx')
        }, error => {
            this.router.navigate(["/reports/patient-lists"]);
            this._snackBar.open(error.error, "ОК");
        });
    }
}
