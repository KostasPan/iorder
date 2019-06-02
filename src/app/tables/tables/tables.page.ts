import { TablesShareService } from './../tables-share.service';
import { AlertService } from './../../services/alert.service';
import { UserPopoverComponent } from './../../popovers/user-popover/user-popover.component';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { TablesService } from '../tables.service';
import { PopoverController, Events } from '@ionic/angular';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss']
})
export class TablesPage implements OnInit {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private tablesService: TablesService,
    public popoverController: PopoverController,
    private alertService: AlertService,
    private tablesShareService: TablesShareService,
    public events: Events
  ) {}

  positions = [];
  tablesd = [];

  username: '';
  isAdmin = false;
  removeTables = false;

  ngOnInit() {
    // this.initTables();
  }

  ionViewWillEnter() {
    this.removeTables = false;
    this.getData();
    this.initTables();
  }

  confirmLogout() {
    this.alertService.presentAlertConfirmLogout();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  getData() {
    this.tokenService.getAuthStoragePayload().then(payload => {
      this.username = payload.data.username;
      this.isAdmin = payload.data.admin;
    });
  }

  initTables() {
    this.tablesService.getTables().subscribe(data => {
      console.log(data);
      this.positions = data.allTables.map(table => table.position_table_name);
      this.tablesd = data.allTables;
    });
  }

  openAddTablesPage() {
    this.router.navigate(['/add-tables']);
  }

  openUsersPage() {
    // navigate to users page
    this.router.navigate(['/users']);
  }

  // async removeTablesPosition(position) {
  // //   await this.tablesService.deleteTable({ positionId: pId }).subscribe();
  // //   await this.initTables();
  // }

  async removeTablesPosition(position) {
    const busytables = position.tables.filter(t => t.busy === true);
    if (busytables.length) {
      this.alertService.presentAlert(
        'Position Deletion',
        'You cannot delete ' + position.position_table_name,
        'There are ' + busytables.length + ' tables with unpaid orders.'
      );
    } else {
      const choice = await this.alertService
        .presentAlertChoices(
          'Position Deletion',
          '',
          'Are you sure you want to delete ' +
            position.position_table_name +
            '?'
        )
        .then(c => {
          return c;
        });
      if (choice.data) {
        await this.tablesService
          .deleteTable({ positionId: position._id })
          .subscribe();
        await this.initTables();
      }
    }
  }

  order(table) {
    this.tablesShareService.setTable(table);

    if (!table.busy || table.user === this.username) {
      this.router.navigate(['/order', table.name, table._id]);
    } else {
      this.alertService.presentAlert(
        'Access Restricted',
        '',
        'Only ' + table.user + ' has access on table named ' + table.name + '.'
      );
    }
  }

  scrollTo(id) {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
