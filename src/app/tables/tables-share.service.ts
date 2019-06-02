import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesShareService {
  private table;

  constructor() {}

  setTable(table) {
    this.table = table;
  }

  async getTable() {
    return await this.table;
  }
}
