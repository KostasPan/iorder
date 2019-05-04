import { UserPopoverComponent } from './../../popovers/user-popover/user-popover.component';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { TablesService } from '../tables.service';
import { PopoverController } from '@ionic/angular';

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
    private loadingService: LoadingService,
    private toastService: ToastService,
    public popoverController: PopoverController
  ) {}

  positions = [];
  tablesd = [];

  username: string;
  isAdmin: boolean;

  ngOnInit() {
    this.initTables();
  }

  ionViewWillEnter() {
    this.getData();
    // this.initTables();
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
    this.loadingService
      .presentLoading()
      .then(() => {
        this.tablesService.getTables().subscribe(
          data => {
            console.log(data);
            console.log(data.allTables.map(table => table.position_table_name));
            this.positions = data.allTables.map(
              table => table.position_table_name
            );
            this.tablesd = data.allTables;
            // this.toastService.presentToast(data.message);
          },
          err => {
            console.log(err);
            let errorMessage: string;
            if (err.error.msg) {
              // unexpected joi error from server
              errorMessage = err.error.msg[0].message;
            } else if (err.error.message) {
              // controlled error from server
              errorMessage = err.error.message;
            } else {
              // machine cannot reach server
              errorMessage = 'Cannot reach server, check interconnection';
            }
            this.toastService.presentToastError(errorMessage);
          }
        );
      })
      .then(() => this.loadingService.dismissLoading());
  }

  logout() {
    this.tokenService.deleteAuthToken();
    this.router.navigate(['/login']);
  }

  openAddTablesPage() {
    this.router.navigate(['/add-tables']);
  }

  order(table) {
    this.router.navigate(['/order', table.name, table._id]);
  }

  scrollTo(id) {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
