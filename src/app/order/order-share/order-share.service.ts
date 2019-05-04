import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderShareService {
  constructor() {}

  order = [];
  table = '';
  tableId = '';

  initOrder(table, tableId) {
    this.order = [];
    this.table = table;
    this.tableId = tableId;
  }

  pushToOrder(product) {
    this.order.push(product);
    console.log(this.table, this.tableId, this.order);
  }

  getOrder() {
    return this.order;
  }

  emptyOrder() {
    this.order = [];
    return [];
  }

  removeProduct(productIndex) {
    if (productIndex > -1) {
      this.order.splice(productIndex, 1);
      console.log('Remove completed');
    }
  }
}
