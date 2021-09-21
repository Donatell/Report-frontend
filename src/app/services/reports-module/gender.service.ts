import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../../entities/reports-module/patient";
import {PatientGenderData} from "../../components/reports-module/gender/gender.component";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GenderService {
    private baseUrl = environment.apiUrl + '/specify-gender/'

    constructor(private httpClient: HttpClient) {
    }

    getPatientsWithUnidentifiedGenderFrom(listId: number): Observable<Patient[]> {
        return this.httpClient.get<Patient[]>(this.baseUrl + listId)
    }

    postData(patientGenderDataArray: PatientGenderData[], patientListId: number): Observable<any> {
        const formData = new FormData();
        formData.append('patientData', JSON.stringify(patientGenderDataArray));
        formData.append('patientListId', patientListId.toString());
        return this.httpClient.post(this.baseUrl, formData);
    }
}
