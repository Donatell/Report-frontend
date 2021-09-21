import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SpecifyDepartmentService} from "../../../services/reports-module/specify-department.service";
import {SpinnerOverlayService} from "../../../services/common/spinner-overlay.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TransneftBaseService} from "../../../services/reports-module/transneft-base.service";
import {TransneftBase} from "../../../entities/reports-module/transneft-base";
import {TransneftPriceCategoryService} from "../../../services/reports-module/transneft-price-category.service";
import {TransneftPriceCategory} from "../../../entities/reports-module/transneft-price-category";
import {TransneftCategoryData} from "../../../entities/reports-module/transneft-category-data";

@Component({
    selector: 'app-specify-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, AfterViewInit {
    patientListId: number = 0;
    categoryData: TransneftCategoryData[] = [];
    transneftBases: TransneftBase[] = [];
    transneftPriceCategories: TransneftPriceCategory[][] = [];
    selectionComplete: boolean = false;

    constructor(private specifyDepartmentService: SpecifyDepartmentService,
                private transneftBaseService: TransneftBaseService,
                private spinnerOverlayService: SpinnerOverlayService,
                private transneftPriceCategoryService: TransneftPriceCategoryService,
                private route: ActivatedRoute,
                private router: Router,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.spinnerOverlayService.show();
        this.patientListId = Number.parseInt(<string>this.route.snapshot.paramMap.get('patientListId'));
    }


    ngAfterViewInit(): void {
        this.specifyDepartmentService.getPatientsWithUnidentifiedDepartment(this.patientListId).subscribe(data => {
            this.categoryData = data;
            this.transneftBaseService.getTransneftBases().subscribe(data => {
                // @ts-ignore
                data.forEach(base => delete base._links!)
                this.transneftBases = data;
                for (let transneftBase of this.transneftBases) {
                    this.transneftPriceCategories.push([]);
                }

                this.transneftPriceCategoryService.getTransneftPriceCategories().subscribe(data => {
                    // @ts-ignore
                    data.forEach(base => delete base._links!)
                    for (const datum of data) {
                        this.transneftPriceCategories[datum.transneftBase.id - 1].push(datum);
                    }
                    this.spinnerOverlayService.hide();
                    console.log(this.categoryData);
                });
            })
        })
    }

    onTransneftPriceCategoryChange(transneftPriceCategoryId: number, index: number) {
        this.categoryData[index].transneftPriceCategory = transneftPriceCategoryId;

        this.selectionComplete = this.categoryData.filter(categoryDatum => categoryDatum.transneftPriceCategory == null).length == 0;
        console.log(this.categoryData);
    }

    onTransneftBaseChange(transneftBaseId: number, index: number) {
        const categoryDatum = this.categoryData[index]
        categoryDatum.transneftBase = this.transneftBases.find(value => value.id == transneftBaseId)!;
        categoryDatum.transneftPriceCategory = null;
    }

    onSubmit() {
        this.spinnerOverlayService.show();

        for (let categoryDatum of this.categoryData) {
            categoryDatum.transneftPriceCategory = this.transneftPriceCategories[categoryDatum.transneftBase?.id! - 1]
                .find(category => category.id == categoryDatum.transneftPriceCategory)!;
        }

        console.log(this.categoryData);

        this.specifyDepartmentService.postPatientsWithCorrectDepartment(this.categoryData).subscribe(response => {
            this.spinnerOverlayService.hide();
            this.router.navigate(["/reports/patient-lists"]);
            this._snackBar.open(response.message, "ОК");
        }, error => {
            this.spinnerOverlayService.hide();
            this.router.navigate(["/reports/patient-lists"]);
            this._snackBar.open(error, "ОК");
        });
    }

}
