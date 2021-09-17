import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PatientListsService} from "../services/patient-lists.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PatientList, PatientListData} from "../../common/patient-list";
import {FileDownloadService, REPORT_TYPE} from "../services/file-download.service";
import {SpinnerOverlayService} from "../services/spinner-overlay.service";
import {MatDialog} from "@angular/material/dialog";
import {DeletePatientListDialogComponent} from "./delete-patient-list-dialog/delete-patient-list-dialog.component";

@Component({
    selector: 'app-patient-lists-table',
    templateUrl: './patient-lists-table.component.html',
    styleUrls: ['./patient-lists-table.component.css']
})
export class PatientListsTableComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = ["id", "companyName", "patientQuantity", "creationDate", "action", "delete"]
    dataSource: MatTableDataSource<PatientListData>;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    patientLists: PatientList[] = [];
    REPORT_TYPE = REPORT_TYPE;

    constructor(private patientListsService: PatientListsService,
                private fileDownloadService: FileDownloadService,
                private spinnerOverlayService: SpinnerOverlayService,
                public dialog: MatDialog) {
        this.dataSource = new MatTableDataSource<PatientListData>()
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
        this.patientListsService.getPatientLists().subscribe(data => {
            this.patientLists = data
            this.dataSource = new MatTableDataSource<PatientListData>(this.patientLists)
            this.dataSource.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Списков на странице';
            this.paginator._intl.nextPageLabel = 'Следующая страница';
            this.paginator._intl.previousPageLabel = 'Предыдущая страница';
            this.dataSource.sort = this.sort;
            this.spinnerOverlayService.hide();
        })
    }
}
