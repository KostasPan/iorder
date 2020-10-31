import { Discount } from './../discount-modal/discount';
import { ShowTablesModalComponent } from './../../tables/show-tables-modal/show-tables-modal.component';
import { TablesShareService } from './../../tables/tables-share.service';
import { TokenService } from './../../services/token.service';
import { AlertService } from './../../services/alert.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderShareService } from '../order-share/order-share.service';
import { ModalController, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { DiscountModalComponent } from '../discount-modal/discount-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
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
    private modalController: ModalController,
    private platform: Platform
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
  isSelectActive = false;
  isAdmin = false;
  discount = new Discount();
  subscription;
  popupIsPresent = false;

  ngOnInit() {
    moment.locale('el');
    // this.checkAdminViewMode().then(isAdmin => (this.adminViewMode = isAdmin));
    this.checkIfAdmin();
    this.tablesShareService.getTable().then((table) => {
      if ('discount' in table) {
        this.discount.discount = table.discount.discount;
        this.discount.type = table.discount.type;
        this.discount.total = table.discount.total;
        this.discount.isDiscountActive = table.discount.isDiscountActive;
        this.discount.discountStr = table.discount.discountStr;
        this.discount.discountedtotal = +(+table.discount
          .discountedtotal).toFixed(2);
      }
    });
    this.total = 0;
    console.log(this.discount.discountedtotal, this.total, this.selectedTotal);
    this.tableName = this.activatedRoute.snapshot.params['tname'];
    this.tableId = this.activatedRoute.snapshot.params['id'];
    this.orderShareService.initOrder(this.tableName, this.tableId);
    // get all sent products from api server
    this.getProducts();
    console.log(this.tableName, this.tableId, this.hasProducts);
  }

  ionViewWillEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      9999999,
      () => {
        if (this.popupIsPresent === false) {
          this.popupIsPresent = true;
          this.back();
        }
      }
    );
    // get all unsent from service
    this.unsentProducts = this.orderShareService.getOrder();
    this.unselectProducts();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async back() {
    if (this.unsentProducts.length <= 0) {
      this.router.navigate(['/tables']);
    } else {
      const choice = await this.alertService
        .presentAlertChoices(
          'Unsent Products',
          this.tableName,
          'Are you sure you want to navigate back to tables?'
        )
        .then((c) => {
          this.popupIsPresent = false;
          return c;
        });
      if (choice.data === true) {
        this.router.navigate(['/tables']);
      }
    }
  }

  sendProducts() {
    // send products to api server
    const body = {
      products: this.unsentProducts,
      tableId: this.tableId,
      table: this.tableName,
      time: moment().format('HH:mm:ss'),
    };
    this.orderService.setOrder(body).subscribe(() => {
      // reset unsentProducts
      this.unsentProducts = this.orderShareService.emptyOrder();
      // get products from api server
      this.getProducts();
    });
  }

  payoffProducts() {
    const body = {
      tableId: this.tableId,
      total: this.total,
    };
    if (this.discount.isDiscountActive) {
      body.total = +(+this.discount.discountedtotal).toFixed(2);
      this.discount.clearfunc();
    }
    this.orderService.payoffOrder(body).subscribe();
    this.products = [];
    this.hasProducts = false;
    this.total = 0;
    this.selectedTotal = 0;
    this.isSelectActive = false;
    this.clearDiscount();
  }

  getProducts() {
    this.orderService.getOrder({ tableId: this.tableId }).subscribe(
      (data) => {
        data.order.forEach((p) => (p.price = +p.price.toFixed(2)));
        this.products = data.order;
        console.log(this.products);
        this.discount.total = this.total = this.calculateTotal(this.products);
        if (
          this.discount.isDiscountActive &&
          this.discount.type === 'percentage'
        ) {
          this.products = this.calculateProductDisPrice(this.products);
        }
        this.updateDiscountedTotal();
        console.log(data.order);
        this.orderChecked = true;
      },
      (error) => {
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
    productsList.forEach((el) => (total += el.price));
    return +total.toFixed(2);
  }

  calculateDiscountedTotal(productsList) {
    let total = 0;
    productsList.forEach((el) => (total += el.discountedPrice));
    return +total.toFixed(2);
  }

  calculateProductDisPrice(productsList) {
    productsList.forEach((p) => {
      p.discountedPrice = +(
        p.price -
        (this.discount.discount / 100) * p.price
      ).toFixed(2);
    });
    return productsList;
  }

  updateDiscountedTotal() {
    if (this.discount.isDiscountActive && this.discount.type === 'percentage') {
      this.discount.discountedtotal = this.calculateDiscountedTotal(
        this.products
      );
    } else if (
      this.discount.isDiscountActive &&
      this.discount.type === 'amount'
    ) {
      let t = this.calculateTotal(this.products) - this.discount.discount;
      t = +t.toFixed(2);
      this.discount.discountedtotal = t <= 0 ? 0 : t;
    }
  }

  selectProduct(product) {
    if (this.unsentProducts.length <= 0) {
      product.selected = !product.selected;
      const selectedProd = this.products.filter((p) => p.selected);
      if (
        this.discount.isDiscountActive &&
        this.discount.type === 'percentage'
      ) {
        this.selectedTotal = this.calculateDiscountedTotal(selectedProd);
      } else if (this.discount.type !== 'amount') {
        this.selectedTotal = this.calculateTotal(selectedProd);
      }
      if (selectedProd.length) {
        this.isSelectActive = true;
      } else {
        this.isSelectActive = false;
      }
    } else {
      this.isSelectActive = false;
    }
  }

  unselectProducts() {
    this.products
      .filter((product) => product.selected === true)
      .map((product) => (product.selected = false));
    this.selectedTotal = 0;
    this.isSelectActive = false;
  }

  payoffSelectedProducts() {
    // get all user selected products' ids
    const selectedProdIds = this.products
      .filter((p) => p.selected)
      .map((p) => p._id);

    if (selectedProdIds.length === this.products.length) {
      // user selects all products, payoff all
      this.payoffProducts();
    } else {
      // user selects several prods, partly payoff
      this.orderService
        .partlyPayoffOrder({
          p_ids: selectedProdIds,
          total: this.selectedTotal,
        })
        .subscribe((data) => {
          this.removeSelectedProducts();
          this.selectedTotal = 0;
          this.isSelectActive = false;
          this.total = this.calculateTotal(this.products);
          this.updateDiscountedTotal();
        });
    }
  }

  removeSelectedProducts() {
    this.products = this.products.filter((p) => !p.selected);
    this.selectedTotal = 0;
    this.isSelectActive = false;
  }

  categories() {
    this.router.navigate([
      '/order',
      this.tableName,
      this.tableId,
      'categories',
    ]);
  }

  async openTablesModal() {
    const selectedProdIds = this.products
      .filter((p) => p.selected)
      .map((p) => p._id);
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ShowTablesModalComponent,
      cssClass: 'details-modal-css-100',
      componentProps: {
        tableName: this.tableName,
        tableId: this.tableId,
      },
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data.tableid) {
        // send api move order
        const selectedOrdersIds = this.products
          .filter((p) => p.selected)
          .map((p) => p._id);
        this.orderService
          .moveOrder({
            fromtableid: this.tableId,
            totableid: detail.data.tableid,
            selectedorders: selectedOrdersIds,
            moveall:
              this.products.length === selectedOrdersIds.length ? true : false,
          })
          .subscribe((data) => {
            if (
              this.discount.isDiscountActive &&
              this.products.length === selectedOrdersIds.length
            ) {
              this.discount.clearfunc();
            }
            this.removeSelectedProducts();
            this.total = this.calculateTotal(this.products);
            if (
              this.discount.isDiscountActive &&
              this.discount.type === 'percentage'
            ) {
              this.discount.discountedtotal = this.calculateDiscountedTotal(
                this.products
              );
              console.log('discounted total', this.discount.discountedtotal);
            } else if (
              this.discount.isDiscountActive &&
              this.discount.type === 'amount'
            ) {
              const t =
                this.calculateTotal(this.products) - this.discount.discount;
              this.discount.discountedtotal = t <= 0 ? 0 : t;
            }
          });
      }
    });

    await modal.present();
  }

  async makeDiscount() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: DiscountModalComponent,
      cssClass: 'details-modal-css-50',
      componentProps: {
        total: this.calculateTotal(this.products),
      },
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data && detail.data.discount) {
        this.unselectProducts();
        this.discount.discountedtotal = +(+detail.data.newtotal).toFixed(2);
        this.discount.discount = +(+detail.data.discount).toFixed(2);
        this.discount.total = +(+this.total).toFixed(2);
        this.discount.type = detail.data.type;
        this.discount.isDiscountActive = true;
        this.discount.discountStr = this.discount.discountStrFunc();
        this.products = this.calculateProductDisPrice(this.products);
        this.orderService
          .setDiscount({ discount: this.discount, tableid: this.tableId })
          .subscribe();
      }
      console.log(this.discount);
    });
    await modal.present();
  }

  clearDiscount() {
    if (this.isAdmin) {
      this.orderService
        .unsetDiscount({ tableid: this.tableId })
        .subscribe((data) => {
          this.discount.clearfunc();
          this.unselectProducts();
        });
    }
  }

  checkIfAdmin() {
    this.tokenService.getAuthStoragePayload().then((p) => {
      this.isAdmin = p.data.admin;
    });
  }

  async checkAdminViewMode() {
    const tokenData = await this.tokenService
      .getAuthStoragePayload()
      .then((payload) => {
        return { username: payload.data.username, admin: payload.data.admin };
      });
    const tableData = await this.tablesShareService.getTable().then((table) => {
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
