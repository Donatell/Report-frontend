import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {TransneftCategoryData} from "../common/transneft-category-data";

@Injectable({
    providedIn: 'root'
})
export class SpecifyDepartmentService {
    private baseUrl = environment.apiUrl + '/specify-department/'

    constructor(private httpClient: HttpClient) {
    }

    getPatientsWithUnidentifiedDepartment(patientListId: number): Observable<TransneftCategoryData[]> {
        return this.httpClient.get<TransneftCategoryData[]>(this.baseUrl + patientListId);
    }

    postPatientsWithCorrectDepartment(categoryData: TransneftCategoryData[]): Observable<any> {
        return this.httpClient.post<TransneftCategoryData[]>(this.baseUrl, categoryData);
    }
}
