import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GenderService} from "../../../services/reports-module/gender.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../../../entities/reports-module/patient";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpinnerOverlayService} from "../../../services/common/spinner-overlay.service";


export class PatientGenderData {
    patientId: number | null;
    fullName: string;
    genderId: number;

    constructor(patientId: number | null, fullName: string, genderId: number) {
        this.patientId = patientId;
        this.fullName = fullName;
        this.genderId = genderId;
    }
}

@Component({
    selector: 'app-gender',
    templateUrl: './gender.component.html',
    styleUrls: ['./gender.component.css']
})

export class GenderComponent implements OnInit, AfterViewInit {
    patientListId: number = 0;
    patients: Patient[] = [];
    genderIds: number[] = [1, 2];
    patientGenderDataArray: PatientGenderData[] = [];

    selectComplete = false;
    inputComplete = true;

    constructor(private genderService: GenderService,
                private route: ActivatedRoute,
                private router: Router,
                private _snackBar: MatSnackBar,
                private spinnerOverlayService: SpinnerOverlayService) {
    }

    onRadioSelect(value: string, patientId: number | null) {
        let formComplete = true;
        for (let patientGenderDatum of this.patientGenderDataArray) {
            if (patientGenderDatum.patientId == patientId) {
                patientGenderDatum.genderId = Number.parseInt(value);
            }
            if (patientGenderDatum.genderId == 0) {
                formComplete = false;
            }
        }

        this.selectComplete = formComplete;
    }

    onInputChange(value: string, patientId: number | null) {
        let formComplete = true;
        for (let patientGenderDatum of this.patientGenderDataArray) {
            if (patientGenderDatum.patientId == patientId) {
                patientGenderDatum.fullName = value;
            }
            if (patientGenderDatum.fullName == '') {
                formComplete = false;
            }
        }
        this.inputComplete = formComplete;
    }

    onSubmit() {
        this.spinnerOverlayService.show();
        this.genderService.postData(this.patientGenderDataArray, this.patientListId).subscribe(
            (response) => {
                this.spinnerOverlayService.hide();
                this.router.navigate(["/reports/patient-lists"]);
                this._snackBar.open(response.message, "ОК");
            },
            (error) => {
                this.spinnerOverlayService.hide();
                this.router.navigate(["/reports/patient-lists"]);
                this._snackBar.open(error.error.error.message, "ОК");
            }
        );
    }

    ngOnInit(): void {
        this.spinnerOverlayService.show();
        this.patientListId = Number.parseInt(<string>this.route.snapshot.paramMap.get('patientListId'));
    }

    ngAfterViewInit(): void {
        this.genderService.getPatientsWithUnidentifiedGenderFrom(this.patientListId).subscribe(data => {
            this.patients = data;
            for (let patient of this.patients) {
                this.patientGenderDataArray.push(new PatientGenderData(patient.id, patient.fullName, 0))
            }
            this.spinnerOverlayService.hide();
        });
    }

}
