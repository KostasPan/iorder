import { AlertService } from './../../services/alert.service';
import { TokenService } from './../../services/token.service';
import { ModalController, NavParams } from '@ionic/angular';
import { TablesService } from './../tables.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-tables-modal',
  templateUrl: './show-tables-modal.component.html',
  styleUrls: ['./show-tables-modal.component.scss']
})
export class ShowTablesModalComponent implements OnInit {
  positions = [];
  tablesd = [];
  tableName = '';
  tableId = '';
  private username = '';

  constructor(
    private tablesService: TablesService,
    private modalController: ModalController,
    private navParams: NavParams,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {
    this.initTables();
  }

  ngOnInit() {
    this.tokenService
      .getAuthStoragePayload()
      .then(payload => (this.username = payload.data.username));
    this.tableId = this.navParams.get('tableId');
    this.tableName = this.navParams.get('tableName');
  }

  initTables() {
    this.tablesService.getTables().subscribe(data => {
      this.positions = data.allTables.map(table => table.position_table_name);
      this.tablesd = data.allTables;
    });
  }

  select(table) {
    console.log(table);
    if (table._id === this.tableId) {
      this.alertService.presentAlert(
        'Move order',
        'Warning',
        'You cannot move order from `' +
          table.name +
          '` to `' +
          this.tableName +
          '`.'
      );
    } else if (table.user !== this.username && table.busy) {
      this.alertService.presentAlert(
        'Move order',
        'Warning',
        'Only `' +
          table.user +
          '` has access on table named `' +
          table.name +
          '`.'
      );
    } else {
      this.myDismiss(table._id);
    }
  }

  async myDismiss(tableid) {
    await this.modalController.dismiss({ tableid: tableid });
  }
}
