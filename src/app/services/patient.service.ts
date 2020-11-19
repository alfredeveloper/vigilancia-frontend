import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token')
    })
};

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(
        private http: HttpClient,
    ) { }

    getPatients(): Observable<any> {

        return this.http.get<any>(`${environment.apiUrl}patients`, httpOptions);

    }

    getPatient(id): Observable<any> {

        return this.http.get<any>(`${environment.apiUrl}patients/${id}`, httpOptions);

    }

    registerPatient(data): Observable<any> {

        return this.http.post<any>(`${environment.apiUrl}patients`, data, httpOptions);

    }

    updatePatient(id, data): Observable<any> {

        return this.http.put<any>(`${environment.apiUrl}patients/${id}`, data, httpOptions);

    }

}
