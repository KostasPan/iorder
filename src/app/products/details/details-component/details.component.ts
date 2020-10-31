import { OrderShareService } from './../../../order/order-share/order-share.service';
import { DetailsShareDataService } from './../details-share/details-share-data.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details-component',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  constructor(
    private detailsShareDataService: DetailsShareDataService,
    public alertController: AlertController,
    private orderShareService: OrderShareService
  ) {}

  @Input() productName;
  @Output() dismissModalEvent = new EventEmitter<any>();
  details;
  detailsOpt;
  productPrice = 0;
  quantity = 0;
  totalPrice = 0;
  comment = '';

  ngOnInit() {
    this.detailsShareDataService.dataDetails.subscribe(
      (details) => (this.details = details)
    );
    this.detailsShareDataService.dataOptionalDetails.subscribe(
      (detailsOpt) => (this.detailsOpt = detailsOpt)
    );
    this.detailsShareDataService.dataPrice.subscribe(
      (price) => (this.productPrice = +(+price).toFixed(2))
    );
    this.quantity = 1;
    this.totalPrice = this.productPrice;
  }

  ngOnDestroy() {
    this.resetUserSelections();
  }

  add() {
    this.quantity++;
    this.totalPrice += +this.productPrice.toFixed(2);
    this.totalPrice = +this.totalPrice.toFixed(2);
  }
  remove() {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalPrice -= +this.productPrice.toFixed(2);
      this.totalPrice = +this.totalPrice.toFixed(2);
    }
  }

  pushValue(type, value) {
    console.log(type, value);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'You have to make an obligatory selection.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  makeOrder() {
    const pref = [];
    const order = {};
    pref.push.apply(pref, this.userChoices(this.details));
    if (!pref.length && this.details.length) {
      this.presentAlert();
      return;
    }
    pref.push.apply(pref, this.userChoices(this.detailsOpt));

    order['name'] = this.productName;
    order['price'] = this.totalPrice;
    order['quantity'] = this.quantity;
    order['choices'] = pref;
    order['comment'] = this.comment;

    // let str = '';
    // order['choices'].forEach((c) => {
    //   str += c.selected + ',';
    // });
    // console.log(str);

    // send on service
    this.orderShareService.pushToOrder(order);

    // close modal
    this.dismissModalEvent.next();
  }

  userChoices(details: Array<any>): Array<any> {
    const pref = [];
    details.map((item) => {
      if (item.selected && item.selected.length) {
        pref.push({
          type: item.type,
          selected: item.selected,
          multiple: item.multiple,
        });
      }
    });
    return pref;
  }

  resetUserSelections() {
    this.details.forEach((d) => (d.selected = null));
    this.detailsOpt.forEach((d) => (d.selected = null));
    this.comment = null;
  }

  clearSelected(d) {
    d.selected = null;
  }
}
