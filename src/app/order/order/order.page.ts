import { TablesShareService } from './../../tables/tables-share.service';
import { TokenService } from './../../services/token.service';
import { AlertService } from './../../services/alert.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderShareService } from '../order-share/order-share.service';

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
    private alertService: AlertService
  ) {}

  // show = false;
  products = [];
  unsentProducts = [];
  hasProducts = true;
  tableName;
  total = 0;
  // adminViewMode = false;
  private tableId;

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
  }

  getProducts() {
    // get products from api server
    // products = server products

    this.orderService.getOrder({ tableId: this.tableId }).subscribe(
      data => {
        this.products = data.order;
        this.calculateTotal();
        console.log(data.order);
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

  calculateTotal() {
    this.total = 0;
    this.products.forEach(el => (this.total += el.price));
  }

  categories() {
    this.router.navigate([
      '/order',
      this.tableName,
      this.tableId,
      'categories'
    ]);
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
