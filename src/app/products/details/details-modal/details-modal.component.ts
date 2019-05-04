import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {
  productName;
  productPrice;
  quantity;
  totalPrice;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.productName = this.navParams.get('productName');
    this.productPrice = this.navParams.get('productPrice');
    this.quantity = 1;
    this.totalPrice = this.productPrice;
  }

  // add() {
  //   this.quantity++;
  //   this.totalPrice += this.productPrice;
  // }
  // remove() {
  //   if (this.quantity > 1) {
  //     this.quantity--;
  //     this.totalPrice -= this.productPrice;
  //   }
  // }

  async myDismiss() {
    await this.modalController.dismiss();
  }

  // dismiss me epistrofi data
  // async myDismiss() {
  //   const total = this.totalPrice;
  //   await this.modalController.dismiss(total);
  // }
}
