import { environment as ENV } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${ENV.BASEURL}/products/get-products-categories`);
  }

  getProductsByCategory(body): Observable<any> {
    return this.http.post(
      `${ENV.BASEURL}/products/get-products-by-category`,
      body
    );
  }
}
