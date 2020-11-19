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
export class FollowService {

    constructor(
        private http: HttpClient,
    ) { }

    registerFollow(data): Observable<any> {

        return this.http.post<any>(`${environment.apiUrl}follows`, data, httpOptions);

    }

    updateFollow(id, data): Observable<any> {

        return this.http.put<any>(`${environment.apiUrl}follows/${id}`, data, httpOptions);

    }

    getFollowsByPatient(id): Observable<any> {

        return this.http.get<any>(`${environment.apiUrl}follows/patient/${id}`, httpOptions);

    }

}
