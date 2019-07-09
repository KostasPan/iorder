import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-discount-modal',
  templateUrl: './discount-modal.component.html',
  styleUrls: ['./discount-modal.component.scss']
})
export class DiscountModalComponent implements OnInit {
  segment = 'percentage';
  total = 0;
  percentage = 0;
  newTotal = 0;
  newAmountTotal = 0;
  amount = 0;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.newTotal = this.total = this.navParams.get('total');
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    if (this.segment === 'percentage') {
      this.newTotal = this.total;
      this.percentage = 0;
    } else {
      this.newAmountTotal = this.total;
      this.amount = 0;
    }
  }

  amountChanged(ev: any) {
    if (ev.detail.value < 0 || !ev.detail.value) {
      this.newAmountTotal = this.total;
      this.amount = 0;
    } else if (ev.detail.value >= this.total) {
      this.newAmountTotal = 0;
      this.amount = ev.detail.value;
    } else {
      this.amount = ev.detail.value;
      this.newAmountTotal = this.calcNewAmountTotal(this.total, this.amount);
    }
  }

  discountChanged(ev: any) {
    this.percentage = ev.detail.value;
    this.newTotal = this.calcNewPercentTotal(this.total, this.percentage);
  }

  calcNewAmountTotal(total, amount) {
    return +(total - amount).toFixed(2);
  }

  calcNewPercentTotal(total, percentage) {
    return +(total - (percentage / 100) * total).toFixed(2);
  }

  async myDismiss(discount, total, type) {
    console.log(this.total, discount, total, type);
    discount = +(+discount).toFixed(2);
    await this.modalController.dismiss({
      oldtotal: this.total,
      discount: discount,
      newtotal: total,
      type: type,
      calcTotalWithDiscount: (t, d, s) => {
        if (s === 'percentage') {
          return this.calcNewPercentTotal(t, d);
        } else {
          return this.calcNewAmountTotal(t, d);
        }
      }
    });
    console.log(this.total, discount, total, type);
  }
}
