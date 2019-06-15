import { Injectable } from '@angular/core';
import { environment as ENV } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getTotals(): Observable<any> {
    return this.http.get(`${ENV.BASEURL}/total/get-total`);
  }
  initTotal(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/total/init-total`, body);
  }
  addUsers(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/register`, body);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${ENV.BASEURL}/users/get-users`);
  }
  deleteUser(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/users/delete-user`, body);
  }
  setUser(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/users/set-user`, body);
  }
}
