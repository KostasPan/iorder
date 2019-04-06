import { environment as ENV } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const BASEURL = 'https://jsonplaceholder.typicode.com/todos/1';
// const BASEURL = 'http://localhost:3000/api/iOrder';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/login`, body);
    // return this.http.get(`${BASEURL}`, body);
  }

  registerUser(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/register`, body);
  }
}
