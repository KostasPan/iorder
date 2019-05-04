import { LoadingService } from './../../services/loading.service';
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
    private loadingService: LoadingService
  ) {}

  // show = false;
  products = [];
  unsentProducts = [];
  hasProducts = false;
  tableName;
  total = 0;
  private tableId;

  ngOnInit() {
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
    this.hasProd();
  }

  sendProducts() {
    // send products to api server
    const body = {
      products: this.unsentProducts,
      tableId: this.tableId
    };

    this.loadingService
      .presentLoading()
      .then(() => {
        this.orderService.setOrder(body).subscribe(
          data => {
            console.log(data);
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
          }
        );
      })
      .then(() => this.loadingService.dismissLoading())
      .then(() => {
        // reset unsentProducts
        this.unsentProducts = this.orderShareService.emptyOrder();
        // get products from api server
        this.getProducts();
      });
  }

  payoffProducts() {
    // todo: payoff
    this.orderService
      .payoffOrder({ tableId: this.tableId, total: this.total })
      .subscribe(data => {
        console.log(data);
      });
    this.products = [];
    this.hasProducts = false;
    this.total = 0;
  }

  getProducts() {
    // get products from api server
    // products = server products
    this.orderService.getOrder({ tableId: this.tableId }).subscribe(data => {
      this.products = data.order;
      this.hasProd();
      this.calculateTotal();
      console.log(data.order);
    });
  }

  removeProduct(productIndex) {
    this.orderShareService.removeProduct(productIndex);
    this.unsentProducts = this.orderShareService.getOrder();
    this.hasProd();
  }

  hasProd() {
    if (
      (this.products && this.products.length) ||
      (this.unsentProducts && this.unsentProducts.length)
    ) {
      this.hasProducts = true;
    } else {
      this.hasProducts = false;
    }
  }

  calculateTotal() {
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
}
