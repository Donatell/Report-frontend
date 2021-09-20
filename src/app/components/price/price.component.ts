import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PriceService} from "../../services/price.service";
import {PatientListsService} from "../../services/patient-lists.service";
import {PatientList} from "../../common/patient-list";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpinnerOverlayService} from "../../services/spinner-overlay.service";

export class PriceData {
    serviceId: number;
    serviceTitle: string;
    price: number;
    quantity: number;

    constructor(serviceId: number, serviceTitle: string, price: number, quantity: number) {
        this.serviceId = serviceId;
        this.serviceTitle = serviceTitle;
        this.price = price;
        this.quantity = quantity;
    }
}

@Component({
    selector: 'app-price',
    templateUrl: './price.component.html',
    styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit, AfterViewInit {
    patientListId: number = 0;
    priceDataArray: PriceData[] = [];
    displayedColumns = ["delete", "service", "price"];
    patientList: PatientList | undefined

    constructor(private route: ActivatedRoute,
                private priceService: PriceService,
                private patientListsService: PatientListsService,
                private router: Router,
                private _snackBar: MatSnackBar,
                private spinnerOverlayService: SpinnerOverlayService) {
    }

    ngOnInit(): void {
        this.spinnerOverlayService.show('Загрузка')
        this.patientListId = Number.parseInt(<string>this.route.snapshot.paramMap.get("patientListId"));
    }

    ngAfterViewInit(): void {
        this.priceService.getPricesFor(this.patientListId).subscribe(data => {
            this.priceDataArray = data;
            this.spinnerOverlayService.hide();
        });

        this.patientListsService.getPatientList(this.patientListId).subscribe(data => {
            this.patientList = data;
        });
    }

    deleteService(serviceId: number) {
        this.priceDataArray = this.priceDataArray.filter((value => value.serviceId !== serviceId));
    }

    onSubmit() {
        this.spinnerOverlayService.show('Загрузка...')
        this.priceService.postPrices(this.priceDataArray, this.patientListId).subscribe(
            (response) => {
                this.spinnerOverlayService.hide();
                this.router.navigate(["/reports/patient-lists"]);
                this._snackBar.open(response.message, "ОК")
            },
            (error) => {
                this.spinnerOverlayService.hide();
                this.router.navigate(["/reports/patient-lists"]);
                this._snackBar.open(error.error.error.message, "ОК")
            });
    }

    changePrice(serviceId: number, price: string) {
        let service = this.priceDataArray.find(value => value.serviceId == serviceId);
        if (typeof service != "undefined") {
            service.price = Number.parseFloat(price);
        }
    }
}
