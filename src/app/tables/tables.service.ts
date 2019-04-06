import { environment as ENV } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  constructor(private http: HttpClient) {}

  addTable(body): Observable<any> {
    return this.http.post(
      `${ENV.BASEURL}/table/add-table`,
      body
      // , {
      //   headers: { Authorization: 'asasasasa' },
      //   withCredentials: true
      // }
    );
  }

  getTables(): Observable<any> {
    return this.http.get(`${ENV.BASEURL}/table/get-tables`);
  }

  modifyTable() {
    // TODO:
  }

  deleteTable() {
    // TODO:
  }
}
