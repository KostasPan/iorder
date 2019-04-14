import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private toastService: ToastService
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
}
