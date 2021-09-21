import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransneftPriceCategory} from "../../entities/reports-module/transneft-price-category";

@Injectable({
    providedIn: 'root'
})
export class TransneftPriceCategoryService {
    private baseUrl = environment.apiUrl + '/transneft-price-categories/';

    constructor(private httpClient: HttpClient) {
    }

    getTransneftPriceCategories():
        Observable<TransneftPriceCategory[]> {
        return this.httpClient.get<TransneftPriceCategory[]>(this.baseUrl)
    }
}
