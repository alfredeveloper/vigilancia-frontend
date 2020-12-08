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
export class SurveyService {

    constructor(
        private http: HttpClient,
    ) { }

    getSwornDeclarations(): Observable<any> {

        return this.http.get<any>(`${environment.apiUrl}sworn-declarations`, httpOptions);

    }

    getAutodiagnoses(): Observable<any> {

        return this.http.get<any>(`${environment.apiUrl}autodiagnoses`, httpOptions);

    }

    saveSwornDeclaration(data): Observable<any> {

        return this.http.post<any>(`${environment.apiUrl}sworn-declarations`, data, httpOptions);

    }

    saveAutodiagnoses(data): Observable<any> {

        return this.http.post<any>(`${environment.apiUrl}autodiagnoses`, data, httpOptions);

    }


}
