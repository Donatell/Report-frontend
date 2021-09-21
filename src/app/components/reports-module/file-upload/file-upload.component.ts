import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploadService} from "../../../services/reports-module/file-upload.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxMatFileInputComponent} from "@angular-material-components/file-input";
import * as XLSX from 'xlsx';
import {ColumnTitle} from "../../../entities/reports-module/column-title";
import {ColumnTitleService} from "../../../services/reports-module/column-title.service";
import {Patient} from "../../../entities/reports-module/patient";
import {SpinnerOverlayService} from "../../../services/common/spinner-overlay.service";
import {Module} from "../../../entities/reports-module/module";
import {ModuleService} from "../../../services/reports-module/module.service";
import {TransneftBase} from "../../../entities/reports-module/transneft-base";
import {TransneftBaseService} from "../../../services/reports-module/transneft-base.service";

export class SelectedColumn {
    columnIndex: number;
    columnTitleId: number;

    constructor(columnIndex: number, columnTitleId: number) {
        this.columnIndex = columnIndex;
        this.columnTitleId = columnTitleId;
    }
}

export class SelectedColumns {
    columns: SelectedColumn[]

    constructor(columns: SelectedColumn[]) {
        this.columns = columns;
    }

    hasColumnTitleId(id: number): boolean {
        let hasId: boolean = false;

        for (let column of this.columns) {
            if (column.columnTitleId == id) {
                hasId = true;
            }
        }

        return hasId;
    }

    insertByColumnIndex(index: number, titleId: number) {
        for (let column of this.columns) {
            if (column.columnIndex == index) {
                this.columns[index].columnTitleId = titleId;
            }
        }
    }

}

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, AfterViewInit {
    // left form
    uploadForm: FormGroup;
    file: any;
    accept: string = '.xlsx';
    required: Boolean = true;
    submitted: boolean = false;
    modules: Module[] = [];
    moduleControl: AbstractControl | null;

    // table data
    selectionComplete: boolean = false;
    dataSource: any[];
    displayedColumns: string[] = [];
    selectedColumns: SelectedColumns = new SelectedColumns([]);
    columnOrder: string[] = [];
    columnTitles: ColumnTitle[];

    // extra modular data
    transneftBases: TransneftBase[] = [];


    constructor(private formBuilder: FormBuilder,
                private fileUploadService: FileUploadService,
                private columnTitleService: ColumnTitleService,
                private router: Router,
                private _snackBar: MatSnackBar,
                private spinnerOverlayService: SpinnerOverlayService,
                private moduleService: ModuleService,
                private transneftBaseService: TransneftBaseService) {
        this.uploadForm = new FormGroup(
            {
                companyNameControl: new FormControl('', [Validators.required]),
                fileControl: new FormControl(this.file, [Validators.required]),
                moduleControl: new FormControl('', [Validators.required])
            });
        this.columnTitles = [];
        this.dataSource = [];
        this.moduleControl = this.uploadForm.get('moduleControl');
    }

    onSelectionChange(columnIndex: string, titleId: number | string) {
        if (typeof titleId === "string") {
            this.selectedColumns.insertByColumnIndex(Number.parseInt(columnIndex), Number.parseInt(titleId));
        } else {
            this.selectedColumns.insertByColumnIndex(Number.parseInt(columnIndex), titleId);
        }
        this.selectionComplete = !this.selectedColumns.hasColumnTitleId(-1);
    }

    onModuleSelectionChange() {
        this.spinnerOverlayService.show();
        this.columnTitleService.getColumnTitles().subscribe(data => {
            this.columnTitles = data;

            // filter out unnecessary Transneft base column title if common module selected
            if (this.moduleControl?.value == 1) {
                this.columnTitles = this.columnTitles.filter(columnTitle => columnTitle.id != 6);
                this.spinnerOverlayService.hide();
            } else if (this.moduleControl?.value == 2) {
                this.transneftBaseService.getTransneftBases().subscribe(data => {
                    this.transneftBases = data
                    this.spinnerOverlayService.hide();
                });
            } else {
                this.spinnerOverlayService.hide();

            }
        });


    }

    ngAfterViewInit(): void {
        this.spinnerOverlayService.show();
        this.moduleService.getModules().subscribe(data => {
            this.modules = data;
            this.spinnerOverlayService.hide();
        })

    }

    ngOnInit(): void {
    }

    onFileChange(fileControl: NgxMatFileInputComponent) {
        this.spinnerOverlayService.show();

        // clear columns, their quantity is dynamic
        this.displayedColumns = [];

        let file = fileControl.ngControl.control?.value;
        const reader = new FileReader();
        reader.onload = (e) => {
            // @ts-ignore
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, {
                type: "array", cellText: false, cellDates: true
            });
            let sheet = workbook.Sheets[workbook.SheetNames[0]];

            // extract first row in case it's a header to avoid data becoming header
            let C = 0;
            let rowAoA: any[][] = [[]];
            let cell;
            while ((cell = sheet[XLSX.utils.encode_cell({c: C, r: 0})]) != null) {
                rowAoA[0][C] = cell;
                C++;
            }

            console.log(sheet);
            console.log(rowAoA);

            // insert first row in the end
            XLSX.utils.sheet_add_aoa(sheet, rowAoA, {
                origin: -1
            });

            // calculate max row length, column count is equal to the length of the longest row
            let jsonArray: Object[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],
                {raw: false, dateNF: 'dd.mm.yyyy'})
            let maxRowLength = 0;
            for (let json of jsonArray) {
                let currentLength = Object.keys(json).length;
                if (currentLength > maxRowLength) {
                    maxRowLength = currentLength;
                }
            }

            console.log(jsonArray);

            // insert custom header using max row length, define displayed columns
            this.displayedColumns.push("delete")

            // headers are numbers used to index columns
            let header: number[][] = [[]];
            for (let i = 0; i < maxRowLength; i++) {
                header[0].push(i);
                this.columnOrder.push(i.toString());
                this.displayedColumns.push(i.toString());
            }
            XLSX.utils.sheet_add_aoa(sheet, header, {
                origin: "A1"
            });

            let sheetToJson = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
                dateNF: 0
            });

            // return the first row of the original table from the last row
            sheetToJson.unshift(sheetToJson.pop());
            this.dataSource = sheetToJson;

            for (let patient of this.dataSource) {
                for (let patientElement of Object.keys(patient)) {
                    if (patient[patientElement] instanceof Date) {
                        patient[patientElement] = patient[patientElement].toLocaleDateString();
                    }
                }
            }

            // -1 indicates select with no data
            // this.displayedColumns.length - first delete column
            this.selectedColumns.columns = [];
            for (let i = 0; i < this.displayedColumns.length - 1; i++) {
                this.selectedColumns.columns.push(new SelectedColumn(i, -1))
            }
            this.spinnerOverlayService.hide();
        }
        reader.readAsArrayBuffer(file);
    }

    deleteRow(index: any) {
        this.dataSource?.splice(index, 1);
    }

    onSubmit() {
        this.spinnerOverlayService.show();
        this.submitted = true

        // create new json with user-selected headers
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet<unknown>(this.dataSource, {
            header: this.columnOrder
        });
        XLSX.utils.book_append_sheet(wb, ws, "list");


        // insert custom header using max row length, define displayed columns
        let header: string[][] = [[]];
        for (let i = 0; i < this.selectedColumns.columns.length; i++) {
            if (this.selectedColumns.columns[i].columnTitleId == 0) {
                header[0].push('0');
            } else {
                for (let columnTitle of this.columnTitles) {
                    if (this.selectedColumns.columns[i].columnTitleId == columnTitle.id) {
                        header[0].push(columnTitle.patientColumn);
                    }
                }
            }
        }

        XLSX.utils.sheet_add_aoa(ws, header, {
            origin: 0
        });

        let patientList: Patient[] = [];
        let json: any[] = XLSX.utils.sheet_to_json(ws);

        let tempPatient: Patient;

        for (let patient of json) {
            tempPatient = new Patient(
                patient.fullName,
                patient.birthDate,
                patient.factorCodes
            );
            if (header[0].includes("profession")) {
                tempPatient.profession = patient.profession;
            }
            if (header[0].includes("department")) {
                tempPatient.department = patient.department;
            }
            if (header[0].includes("transneftBase") && patient.transneftBase != null) {
                const transneftBase = this.transneftBases.find(value => {
                    return patient.transneftBase.trim().toLowerCase().includes(value.title.toLowerCase())
                });
                if (typeof transneftBase != "undefined") {
                    // @ts-ignore
                    delete transneftBase._links
                    tempPatient.transneftBase = transneftBase;
                }
            }
            patientList.push(tempPatient);
        }

        console.log(patientList);

        this.fileUploadService.upload(this.uploadForm, patientList).subscribe(
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
}
