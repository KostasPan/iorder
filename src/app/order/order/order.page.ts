import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit {
  constructor(private router: Router) {}

  // show = false;
  products = [];
  hasProducts = false;

  ngOnInit() {
    if (this.products && this.products.length) {
      this.hasProducts = true;
    }
  }

  categories() {
    this.router.navigate(['/categories']);
  }
}
