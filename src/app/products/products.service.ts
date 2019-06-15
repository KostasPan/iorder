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
  getAllProductsCategSorted(): Observable<any> {
    return this.http.get(
      `${ENV.BASEURL}/products/get-all-products-categ-sorted`
    );
  }
  getProductsByCategory(body): Observable<any> {
    return this.http.post(
      `${ENV.BASEURL}/products/get-products-by-category`,
      body
    );
  }
  addProduct(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/products/add-product`, body);
  }
  editProduct(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/products/edit-product`, body);
  }
  deleteProduct(body): Observable<any> {
    return this.http.post(`${ENV.BASEURL}/products/delete-product`, body);
  }
}
