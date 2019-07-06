import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss']
})
export class CategoriesPage implements OnInit {
  constructor(
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  categories = [];

  ngOnInit() {
    this.initCategories();
  }

  initCategories() {
    this.productsService.getCategories().subscribe(data => {
      this.categories = data.categories;
    });
  }

  products(category) {
    this.router.navigate([
      '/order',
      this.activatedRoute.snapshot.params['tname'],
      this.activatedRoute.snapshot.params['id'],
      'categories',
      category
    ]);
  }

  goToOrderList() {
    console.log(this.router.url);
    console.log(this.removeLastUrlElement(this.router.url));
    this.router.navigateByUrl(this.removeLastUrlElement(this.router.url));
    // this.location.back();
  }

  removeLastUrlElement(url) {
    const array = url.split('/');
    array.pop();
    return array.join('/');
  }
}
