import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ColumnTitle} from "../common/column-title";
import {environment} from "../../environments/environment";

interface GetResponse {
    _embedded: {
        columnTitles: ColumnTitle[]
    }
}

@Injectable({
    providedIn: 'root'
})
export class ColumnTitleService {

    private baseUrl = environment.apiUrl + '/columnTitles';

    constructor(private httpClient: HttpClient) {
    }

    getColumnTitles():
        Observable<ColumnTitle[]> {
        return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(response => response._embedded.columnTitles))
    }


}
