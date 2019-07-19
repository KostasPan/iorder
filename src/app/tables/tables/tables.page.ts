import { CommentModalComponent } from './../comment-modal/comment-modal.component';
import { SetTableModalComponent } from './../set-table-modal/set-table-modal.component';
import { TablesShareService } from './../tables-share.service';
import { AlertService } from './../../services/alert.service';
import { UserPopoverComponent } from './../../popovers/user-popover/user-popover.component';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { TablesService } from '../tables.service';
import {
  PopoverController,
  Events,
  ModalController,
  Platform
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

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
    private modalController: ModalController,
    public events: Events,
    private platform: Platform
  ) {}

  positions = [];
  tablesd = [];

  username: '';
  isAdmin = false;
  removeTables = false;
  editTables = false;
  allBusy = false;
  popupIsPresent = false;
  subscription;

  ngOnInit() {
    // this.initTables();
  }

  ionViewWillEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      9999999,
      () => {
        if (this.popupIsPresent === false) {
          this.confirmLogout();
        }
      }
    );
    this.removeTables = false;
    this.getData();
    this.initTables();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  confirmLogout() {
    this.popupIsPresent = true;
    this.alertService
      .presentAlertConfirmLogout()
      .then(() => (this.popupIsPresent = false));
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
      this.checkIfAllTablesBusy(
        data.allTables
          .map(t => t.length_tables)
          .reduce(function(acc, val) {
            return acc + val;
          }, 0),
        data.numOfBusyTables[0].total
      );
    });
  }

  checkIfAllTablesBusy(allTables, busyTables) {
    console.log(allTables, busyTables);
    if (allTables && busyTables && allTables === busyTables) {
      this.allBusy = true;
    } else {
      this.allBusy = false;
    }
  }

  openAddTablesPage() {
    this.router.navigate(['/add-tables']);
  }

  openUsersPage() {
    this.router.navigate(['/users']);
  }

  openPayments() {
    this.router.navigate(['/payments']);
  }

  openAddUsersPage() {
    this.router.navigate(['/add-users']);
  }

  openCatalogue() {
    this.router.navigate(['/catalogue']);
  }

  async removeTablesPosition(position) {
    const busytables = position.tables.filter(t => t.busy === true);
    if (busytables.length) {
      this.alertService.presentAlert(
        'Position Deletion',
        'You cannot delete `' + position.position_table_name + '`',
        'There are `' + busytables.length + '` tables with unpaid orders.'
      );
    } else {
      const choice = await this.alertService
        .presentAlertChoices(
          'Position Deletion',
          '',
          'Are you sure you want to delete `' +
            position.position_table_name +
            '`?'
        )
        .then(c => {
          return c;
        });
      if (choice.data === true) {
        await this.tablesService
          .deleteTable({ positionId: position._id })
          .subscribe(() => this.initTables());
      }
    }
  }

  async editTablesPositionModal(tablesData) {
    console.log(tablesData);
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: SetTableModalComponent,
      cssClass: 'details-modal-css-50',
      componentProps: {
        _id: tablesData._id,
        position_table_name: tablesData.position_table_name,
        position_table: tablesData.position_table
      }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        if (detail.data.customized === true) {
          let index = this.positions.indexOf(tablesData.position_table_name);
          this.positions[index] = detail.data.position_table_name;

          index = this.tablesd.indexOf(tablesData);
          this.tablesd[index].position_table = detail.data.position_table;
          this.tablesd[index].position_table_name =
            detail.data.position_table_name;
        }
      }
    });

    await modal.present();
  }

  async sendCommentModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: CommentModalComponent,
      cssClass: 'details-modal-css-50',
      componentProps: {}
    });
    await modal.present();
  }

  order(table, positionShort) {
    table.name = positionShort + table.id;

    this.tablesShareService.setTable(table);

    if (!table.busy || table.user === this.username) {
      this.router.navigate(['/order', table.name, table._id]);
    } else {
      this.alertService.presentAlert(
        'Access Restricted',
        '',
        'Only `' +
          table.user +
          '` has access on table named `' +
          table.name +
          '`.'
      );
    }
  }

  goToTablesDetails() {
    this.router.navigate(['/show-tables-details']);
  }

  scrollTo(id) {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
