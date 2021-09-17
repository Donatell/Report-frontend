import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PatientListsService} from "../../services/patient-lists.service";
import {SpinnerOverlayService} from "../../services/spinner-overlay.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface DialogData {
    patientListId: number;
    companyName: string;
}

@Component({
    selector: 'app-delete-patient-list-dialog',
    templateUrl: './delete-patient-list-dialog.component.html',
    styleUrls: ['./delete-patient-list-dialog.component.css']
})
export class DeletePatientListDialogComponent implements OnInit {

    @Output() deletionEvent = new EventEmitter<string>();

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
                private patientListsService: PatientListsService,
                private spinnerOverlayService: SpinnerOverlayService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    onDelete(patientListId: number, companyName: string) {
        this.spinnerOverlayService.show();
        console.log(patientListId);
        this.patientListsService.deletePatientList(patientListId).subscribe(response => {
            this.spinnerOverlayService.hide();
            this._snackBar.open(`Список "${companyName}" удалён`);
        }, error => {
            this.spinnerOverlayService.hide();
            this._snackBar.open(`Не удалось удалить список "${companyName}"`);
        });
    }
}
