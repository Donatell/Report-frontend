import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PriceData} from "../../components/reports-module/price/price.component";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PriceService {
    private baseUrl = environment.apiUrl + '/specify-prices/'

    constructor(private httpClient: HttpClient) {
    }

    getPricesFor(patientListId: number): Observable<PriceData[]> {
        return this.httpClient.get<PriceData[]>(this.baseUrl + patientListId)
    }

    postPrices(priceDataArray: PriceData[], patientListId: number): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + patientListId, priceDataArray);
    }
}
