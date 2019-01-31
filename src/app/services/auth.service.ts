import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/iorder';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(body): Observable<any> {
    // TODO: na allaksw to endpoint se '/login'
    // return this.http.post(`${BASEURL}/login`, body);
    return this.http.post(`${BASEURL}/register`, body);
  }

  registerUser(body): Observable<any> {
    return this.http.post(`${BASEURL}/register`, body);
  }
}
