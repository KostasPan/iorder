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
}
