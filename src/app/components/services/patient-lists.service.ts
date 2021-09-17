import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PatientList} from "../../common/patient-list";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

interface GetResponse {
    _embedded: {
        patientLists: PatientList[]
    }
}

interface GetListResponse {

}

@Injectable({
    providedIn: 'root'
})
export class PatientListsService {

    private baseUrl = environment.apiUrl + '/patientLists/';

    constructor(private httpClient: HttpClient) {
    }

    deletePatientList(patientListId: number): Observable<any> {
        return this.httpClient.delete(environment.apiUrl + '/delete-patient-list/' + patientListId);
    }

    getPatientLists():
        Observable<PatientList[]> {
        return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(response => response._embedded.patientLists))
    }

    getPatientList(patientListId: number): Observable<PatientList> {
        return this.httpClient.get<PatientList>(this.baseUrl + patientListId);
    }
}
