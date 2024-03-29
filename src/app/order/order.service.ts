import { Injectable } from '@angular/core';
import { environment as ENV } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrder(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/order/get-order`, body);
  }
  setOrder(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/order/set-order`, body);
  }
  sendComment(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/order/comment`, body);
  }
  payoffOrder(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/total/set-total`, body);
  }
  partlyPayoffOrder(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/total/set-partly-total`, body);
  }
  moveOrder(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/order/move-order`, body);
  }
  setDiscount(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/discount/set-discount`, body);
  }
  unsetDiscount(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/discount/unset-discount`, body);
  }
}
