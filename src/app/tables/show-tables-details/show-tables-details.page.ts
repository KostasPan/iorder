import { TablesService } from './../tables.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-show-tables-details',
  templateUrl: './show-tables-details.page.html',
  styleUrls: ['./show-tables-details.page.scss']
})
export class ShowTablesDetailsPage implements OnInit {
  constructor(private tablesService: TablesService) {}

  tables;

  ngOnInit() {
    moment.locale('el');
  }

  ionViewWillEnter() {
    this.tablesService.getBusyTables().subscribe(data => {
      this.tables = data.busyTables;
      console.log(this.tables);
    });
  }

  timeFromNow(orderTime) {
    return moment(orderTime).fromNow();
  }
}
