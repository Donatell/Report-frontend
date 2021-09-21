import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PatientListsService} from "../../../services/reports-module/patient-lists.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PatientList, PatientListData} from "../../../entities/reports-module/patient-list";
import {FileDownloadService, REPORT_TYPE} from "../../../services/reports-module/file-download.service";
import {SpinnerOverlayService} from "../../../services/common/spinner-overlay.service";
import {MatDialog} from "@angular/material/dialog";
import {DeletePatientListDialogComponent} from "./delete-patient-list-dialog/delete-patient-list-dialog.component";
import {Module} from "../../../entities/reports-module/module";
import {ModuleService} from "../../../services/reports-module/module.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
    selector: 'app-patient-lists-table',
    templateUrl: './patient-lists-table.component.html',
    styleUrls: ['./patient-lists-table.component.css']
})
export class PatientListsTableComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = ["id", "companyName", "patientQuantity", "creationDate", "module", "action", "delete"]
    dataSource: MatTableDataSource<PatientListData>;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    patientLists: PatientList[] = [];
    REPORT_TYPE = REPORT_TYPE;
    modules: Module[] = [];

    constructor(private patientListsService: PatientListsService,
                private fileDownloadService: FileDownloadService,
                private spinnerOverlayService: SpinnerOverlayService,
                private moduleService: ModuleService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private router: Router) {
        this.dataSource = new MatTableDataSource<PatientListData>();
    }

    ngOnInit(): void {
        this.spinnerOverlayService.show('Загрузка...')
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.dataSource.filter = filterValue.trim().toLowerCase()

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngAfterViewInit(): void {
        this.listPatientLists();
    }

    onDownloadClick(patientListId: number, reportType: REPORT_TYPE, companyName: string) {
        this.fileDownloadService.downloadReport(patientListId, reportType, companyName)
    }

    openDialog(patientListId: number, companyName: string) {
        this.dialog.open(DeletePatientListDialogComponent, {
            data: {
                patientListId: patientListId,
                companyName: companyName
            }
        }).afterClosed().subscribe(value => this.listPatientLists());
    }

    private listPatientLists() {
        this.moduleService.getModules().subscribe(data => {
            this.modules = data;

            this.patientListsService.getPatientLists().subscribe(data => {
                this.patientLists = data;

                for (let patientList of this.patientLists) {
                    for (let module of this.modules) {
                        if (patientList.moduleId == module.id) {
                            patientList.moduleId = module;
                        }
                    }
                }

                this.dataSource = new MatTableDataSource<PatientListData>(this.patientLists)
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Списков на странице';
                this.paginator._intl.nextPageLabel = 'Следующая страница';
                this.paginator._intl.previousPageLabel = 'Предыдущая страница';
                this.dataSource.sort = this.sort;

                this.spinnerOverlayService.hide();
            }, error => {
                this.spinnerOverlayService.hide();
                this.router.navigate(["/reports/patient-lists"]);
                this._snackBar.open(error.error, "ОК");
            })
        }, error => {
            this.spinnerOverlayService.hide();
            this.router.navigate(["/reports/patient-lists"]);
            this._snackBar.open(error.error, "ОК");
        })


    }
}
