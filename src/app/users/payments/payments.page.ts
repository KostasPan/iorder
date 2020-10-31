import { AlertService } from './../../services/alert.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  users = [];
  total = 0;
  user = {};

  constructor(
    private usersService: UsersService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.initUsers();
  }

  calcTotal() {
    let total = 0;
    this.users.forEach((el) => {
      total += el.total;
    });
    return +total.toFixed(2);
  }

  async userPayoff(user) {
    const choice = await this.alertService
      .presentAlertChoices(
        'Payments',
        '',
        'Do you want to receive € ' +
          user.total +
          ' payments from `' +
          user.username +
          '` ?'
      )
      .then((c) => {
        return c;
      });

    if (choice.data === true) {
      this.usersService.initTotal({ userId: user._id }).subscribe((data) => {
        user.payoff = true;
        user.ordersToGo = 0;
        this.removeUser(user);
        this.total = this.calcTotal();
      });
    }
    // this.test(user);
  }

  removeUser(user) {
    this.users.splice(this.users.indexOf(user), 1);
  }

  initUsers() {
    this.usersService.getTotals().subscribe((data) => {
      data.totals.forEach((t) => (t.total = +t.total.toFixed(2)));
      this.users = data.totals;
      this.total = this.calcTotal();
    });
  }
}
