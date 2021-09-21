import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    private baseUrl = environment.apiUrl + '/files';

    constructor(private http: HttpClient) {
    }

    upload(formGroup: FormGroup, patientList: any[]): Observable<any> {
        const formData = new FormData();
        formData.append('companyName', formGroup.value.companyNameControl);
        formData.append('patientList', JSON.stringify(patientList));
        formData.append('moduleId', formGroup.value.moduleControl);
        return this.http.post(this.baseUrl, formData);
    }

    getFile(): Observable<any> {
        return this.http.get(`${this.baseUrl}/files`);
    }
}
