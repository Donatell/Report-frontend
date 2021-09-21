import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TransneftBase} from "../../entities/reports-module/transneft-base";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

interface GetResponse {
    _embedded: {
        transneftBases: TransneftBase[]
    }
}

@Injectable({
    providedIn: 'root'
})
export class TransneftBaseService {
    private baseUrl = environment.apiUrl + '/transneftBases/'

    constructor(private httpClient: HttpClient) {
    }

    getTransneftBases(): Observable<TransneftBase[]> {
        return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(response => response._embedded.transneftBases))
    }
}
