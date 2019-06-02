import { AlertService } from './../../services/alert.service';
import { ToastService } from './../../services/toast.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
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
    this.users.forEach(el => {
      total += el.total;
    });
    return total;
  }

  async userPayoff(user) {
    const choice = await this.alertService
      .presentAlertChoices(
        'Payments',
        '',
        'Do you want to receive € ' +
          user.total +
          ' payments from ' +
          user.username +
          ' ?'
      )
      .then(c => {
        return c;
      });

    if (choice.data) {
      this.usersService.initTotal({ userId: user._id }).subscribe();
      user.payoff = true;
      user.ordersToGo = 0;
      this.removeUser(user);
      this.total = this.calcTotal();
    }
    // this.test(user);
  }

  removeUser(user) {
    this.users.splice(this.users.indexOf(user), 1);
  }

  test(user) {
    console.log(user._id);
    // const k = this.users.findIndex(u => u._id === user._id);
    const k = this.users.indexOf(user);
    this.users[k].ordersToGo += 10;
    console.log(this.users);
  }

  initUsers() {
    this.usersService.getTotals().subscribe(data => {
      this.users = data.totals;
      this.total = this.calcTotal();
    });
  }
}
