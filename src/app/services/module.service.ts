import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../common/module";
import {map} from "rxjs/operators";

interface GetResponse {
    _embedded: {
        modules: Module[]
    }
}

@Injectable({
    providedIn: 'root'
})
export class ModuleService {
    private baseUrl = environment.apiUrl + '/modules';

    constructor(private httpClient: HttpClient) {
    }

    getModules(): Observable<Module[]> {
        return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(response => response._embedded.modules));
    }
}
