import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {}

  categories = [];

  ngOnInit() {
    this.initCategories();
  }

  initCategories() {
    this.loadingService
      .presentLoading()
      .then(() => {
        this.productsService.getCategories().subscribe(
          data => {
            console.log(data);
            this.categories = data.categories;
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
            this.toastService.presentToastError(errorMessage);
          }
        );
      })
      .then(() => this.loadingService.dismissLoading());
  }

  products(category) {
    // this.router.navigate(['/categories', category]);
    this.router.navigate([
      '/order',
      this.activatedRoute.snapshot.params['tname'],
      this.activatedRoute.snapshot.params['id'],
      'categories',
      category
    ]);
  }
}
