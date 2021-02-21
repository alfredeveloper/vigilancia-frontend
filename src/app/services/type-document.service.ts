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
export class TypeDocumentService {

    constructor(
        private http: HttpClient,
    ) { }

    getTiposDeDocumentos(): Observable<any> {

        return this.http.get<any>(`${environment.apiUrl}type-documents`, httpOptions);

    }
    
}
