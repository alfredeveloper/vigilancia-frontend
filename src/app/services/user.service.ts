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
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}users`, httpOptions);

  }

  getUser(id): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}users/${id}`, httpOptions);

  }

  registerUser(data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}users`, data, httpOptions);

  }

  updateUser(id, data): Observable<any> {

    return this.http.put<any>(`${environment.apiUrl}users/${id}`, data, httpOptions);

  }

}
