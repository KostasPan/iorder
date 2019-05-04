import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsShareDataService {
  private dataSource = new BehaviorSubject('data');
  private dataOptionalSourse = new BehaviorSubject('optionals');
  private dataPriceSourse = new BehaviorSubject('price');
  dataDetails = this.dataSource.asObservable();
  dataOptionalDetails = this.dataOptionalSourse.asObservable();
  dataPrice = this.dataPriceSourse.asObservable();

  constructor() {}

  changeDetails(data, optData, price) {
    this.dataSource.next(data);
    this.dataOptionalSourse.next(optData);
    this.dataPriceSourse.next(price);
  }
}
