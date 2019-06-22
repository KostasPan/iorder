import { ShowTablesModalComponent } from './../../tables/show-tables-modal/show-tables-modal.component';
import { TablesShareService } from './../../tables/tables-share.service';
import { TokenService } from './../../services/token.service';
import { AlertService } from './../../services/alert.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderShareService } from '../order-share/order-share.service';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderShareService: OrderShareService,
    private orderService: OrderService,
    private tablesShareService: TablesShareService,
    private tokenService: TokenService,
    private alertService: AlertService,
    private modalController: ModalController
  ) {}

  // show = false;
  products = [];
  unsentProducts = [];
  hasProducts = true;
  tableName;
  total = 0;
  // adminViewMode = false;
  private tableId;
  selectedTotal = 0;
  orderChecked = false;
  showPartlyPayoffBtn = false;

  ngOnInit() {
    // this.checkAdminViewMode().then(isAdmin => (this.adminViewMode = isAdmin));
    this.total = 0;
    this.tableName = this.activatedRoute.snapshot.params['tname'];
    this.tableId = this.activatedRoute.snapshot.params['id'];
    this.orderShareService.initOrder(this.tableName, this.tableId);
    // get all sent products from api server
    this.getProducts();
    console.log(this.tableName, this.tableId, this.hasProducts);
  }

  ionViewWillEnter() {
    // get all unsent from service
    this.unsentProducts = this.orderShareService.getOrder();

    this.unselectProducts();
  }

  sendProducts() {
    // send products to api server
    const body = {
      products: this.unsentProducts,
      tableId: this.tableId
    };

    this.orderService.setOrder(body).subscribe(() => {
      // reset unsentProducts
      this.unsentProducts = this.orderShareService.emptyOrder();
      // get products from api server
      this.getProducts();
    });
  }

  payoffProducts() {
    this.orderService
      .payoffOrder({ tableId: this.tableId, total: this.total })
      .subscribe();
    this.products = [];
    this.hasProducts = false;
    this.total = 0;
    this.selectedTotal = 0;
  }

  getProducts() {
    // get products from api server
    // products = server products

    this.orderService.getOrder({ tableId: this.tableId }).subscribe(
      data => {
        this.products = data.order;
        this.total = this.calculateTotal(this.products);
        console.log(data.order);
        this.orderChecked = true;
      },
      error => {
        if (error.error.auth === null) {
          this.alertService.presentAlert(
            'Table Access',
            'Warning',
            'Another user has already placed an order for table: `' +
              this.tableName +
              '`.'
          );
          this.router.navigate(['/tables']);
        }
      }
    );
  }

  removeProduct(productIndex) {
    this.orderShareService.removeProduct(productIndex);
    this.unsentProducts = this.orderShareService.getOrder();
  }

  calculateTotal(productsList) {
    let total = 0;
    productsList.forEach(el => (total += el.price));
    return total;
  }

  selectProduct(product) {
    if (this.unsentProducts.length <= 0) {
      product.selected = !product.selected;
      const selectedProd = this.products.filter(p => p.selected);
      this.selectedTotal = this.calculateTotal(selectedProd);
      if (selectedProd.length) {
        this.showPartlyPayoffBtn = true;
      }
    } else {
      this.showPartlyPayoffBtn = false;
    }
  }

  unselectProducts() {
    this.products
      .filter(product => product.selected === true)
      .map(product => (product.selected = false));
    this.selectedTotal = 0;
    this.showPartlyPayoffBtn = false;
  }

  payoffSelectedProducts() {
    // get all user selected products' ids
    const selectedProdIds = this.products
      .filter(p => p.selected)
      .map(p => p._id);

    if (selectedProdIds.length === this.products.length) {
      // user selects all products, payoff all
      this.payoffProducts();
    } else {
      // user selects several prods, partly payoff
      this.orderService
        .partlyPayoffOrder({
          p_ids: selectedProdIds,
          total: this.selectedTotal
        })
        .subscribe(data => {
          this.removeSelectedProducts();
          this.selectedTotal = 0;
          this.total = this.calculateTotal(this.products);
        });
    }
  }

  removeSelectedProducts() {
    this.products = this.products.filter(p => !p.selected);
    this.selectedTotal = 0;
  }

  categories() {
    this.router.navigate([
      '/order',
      this.tableName,
      this.tableId,
      'categories'
    ]);
  }

  async openTablesModal() {
    const selectedProdIds = this.products
      .filter(p => p.selected)
      .map(p => p._id);
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ShowTablesModalComponent,
      cssClass: 'details-modal-css-100',
      componentProps: {
        tableName: this.tableName,
        tableId: this.tableId
      }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.tableid) {
        // send api move order
        const selectedOrdersIds = this.products
          .filter(p => p.selected)
          .map(p => p._id);
        this.orderService
          .moveOrder({
            fromtableid: this.tableId,
            totableid: detail.data.tableid,
            selectedorders: selectedOrdersIds,
            moveall:
              this.products.length === selectedOrdersIds.length ? true : false
          })
          .subscribe(data => {
            this.removeSelectedProducts();
            this.total = this.calculateTotal(this.products);
          });
      }
    });

    await modal.present();
  }

  async checkAdminViewMode() {
    const tokenData = await this.tokenService
      .getAuthStoragePayload()
      .then(payload => {
        return { username: payload.data.username, admin: payload.data.admin };
      });
    const tableData = await this.tablesShareService.getTable().then(table => {
      return { busy: table.busy, user: table.user };
    });

    // TODO: compare user._id, not user.username
    if (
      tokenData.admin &&
      tokenData.username !== tableData.user &&
      tableData.busy
    ) {
      console.log('isAdminViewMode---->>', true);
      return true;
    }
    console.log('isAdminViewMode---->>', false);
    return false;
  }
}
