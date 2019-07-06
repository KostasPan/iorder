import { DetailsShareDataService } from './../details/details-share/details-share-data.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { ToastService } from 'src/app/services/toast.service';
import { ModalController } from '@ionic/angular';
import { DetailsModalComponent } from '../details/details-modal/details-modal.component';
import { OverlayEventDetail } from '@ionic/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalController: ModalController,
    private router: Router,
    private datailsService: DetailsShareDataService,
    private location: Location
  ) {}

  private category: string;
  products = [];

  ngOnInit() {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.initProducts(this.category);
  }

  initProducts(c) {
    console.log(c);
    const body = { category: c };
    this.productsService.getProductsByCategory(body).subscribe(data => {
      this.products = data.products;
    });
  }

  details(index) {
    const product = this.products[index];
    if (!product.details.length && !product.detailsoptional.length) {
      this.openModal(product.price, product.name, 'details-modal-css-50');
    } else {
      // this.openDetailsPage();
      this.openModal(product.price, product.name, 'details-modal-css-100');
    }
    this.datailsService.changeDetails(
      product.details,
      product.detailsoptional,
      product.price
    );
  }

  async openModal(price, name, css) {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: DetailsModalComponent,
      cssClass: css,
      componentProps: {
        productName: name,
        productPrice: price
      }
    });
    // se periptwsi pou energopoiithei i onDidDismiss()
    // epistrefei data
    // modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    //   if (detail !== null) {
    //     console.log('The result:', detail);
    //   }
    // });
    await modal.present();
  }

  openDetailsPage() {
    this.router.navigate(['/details']);
  }

  goToOrderList() {
    this.router.navigateByUrl(this.removeLastUrlTwoElement(this.router.url));
    // this.location.back();
    // this.location.back();
  }

  removeLastUrlTwoElement(url) {
    const array = url.split('/');
    console.log(array);
    array.pop();
    array.pop();
    return array.join('/');
  }
}
