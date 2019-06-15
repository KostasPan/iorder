import { AlertService } from './../../services/alert.service';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SetProductComponent } from '../set-product/set-product.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss']
})
export class CataloguePage implements OnInit {
  products = [];
  data = [];

  constructor(
    private productsService: ProductsService,
    private alertService: AlertService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.productsService.getAllProductsCategSorted().subscribe(data => {
      this.products = data.products;
      this.setDataStructure();
    });
  }

  setDataStructure() {
    this.data = [];
    const categories = Array.from(new Set(this.products.map(p => p.category)));
    categories.forEach(categoryName => {
      this.data.push({
        category: categoryName,
        items: this.getProductsByCat(categoryName)
      });
    });
    console.log('data', this.data);
  }

  // findAllCategories() {
  //   this.categories = Array.from(new Set(this.products.map(p => p.category)));
  //   console.log(this.categories);
  // }

  getProductsByCat(category) {
    return this.products.filter(el => el.category === category);
  }

  async deleteProduct(product) {
    const choice = await this.alertService
      .presentAlertChoices(
        'Product Deletion',
        '',
        'Are you sure you want to delete `' + product.name + '`?'
      )
      .then(c => {
        return c;
      });
    if (choice.data === true) {
      await this.productsService
        .deleteProduct({ _id: product._id })
        .subscribe(data => {
          this.removeProductData(product);
        });
    }
  }

  removeProductData(product) {
    const category = this.data.find(el => el.category === product.category);
    const index = this.data.indexOf(category);
    this.data[index].items.splice(this.data[index].items.indexOf(product), 1);
    if (this.data[index].items.length <= 0) {
      this.data.splice(index, 1);
    }
  }

  async openProductModal(product, action) {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: SetProductComponent,
      cssClass: 'details-modal-css-100',
      componentProps: {
        product: product,
        action: action
      }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        if (detail.data.updateUI === true) {
          this.getAllProducts();
        }
      }
    });

    await modal.present();
  }
}
